import Layout from '@theme/Layout';
import ky from 'ky';
import sortBy from 'lodash/sortBy.js';
import { useEffect, useState } from 'react';


const lambdaUrl = 'https://qsk5sze4w4bxfgek4rcrncsdpm0qrmfa.lambda-url.us-east-1.on.aws/';

interface WorflowRunResponse {
  workflow_runs: {
    id: number,
    artifacts_url: string,
    conclusion: string,
    status: string,
    head_sha: string,
    head_branch: string,
    created_at: string,
    html_url: string,
  }[],
}

interface ArtifactResponse {
  artifacts: {
    id: number,
    name: string,
    size_in_bytes: number,
  }[],
}

export default function LosslessCutNightly() {
  const [latestWorkflow, setLatestWorkflow] = useState<{ headSha: string, headBranch: string, createdAt: string, artifacts: { id: number, name: string, url: string, size: number }[] }>();

  useEffect(() => {
    (async () => {
      const { workflow_runs: workflowRuns } = await ky.get('https://api.github.com/repos/mifi/lossless-cut/actions/workflows/build.yml/runs').json<WorflowRunResponse>();
      const latestWorkflowResponse = workflowRuns.find((r) => r.conclusion === 'success' && r.status === 'completed');

      if (latestWorkflowResponse) {
        const { artifacts: artifactsResponse } = await ky.get(latestWorkflowResponse.artifacts_url).json<ArtifactResponse>();
        setLatestWorkflow({
          headSha: latestWorkflowResponse.head_sha,
          headBranch: latestWorkflowResponse.head_branch,
          createdAt: latestWorkflowResponse.created_at,
          artifacts: artifactsResponse.map((artifact) => ({
            id: artifact.id,
            url: `${lambdaUrl}?artifactId=${encodeURIComponent(artifact.id)}`,
            name: artifact.name,
            size: artifact.size_in_bytes,
          })),
        });
      } else {
        console.error('No successful workflow found');
      }
    })();
  }, []);

  return (
    <Layout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '50vh' }}>
        {!latestWorkflow ? 'Plase wait while I take you to the latest nightly build...' : (
          <div style={{ margin: '3em' }}>
            Here is the latest nightly build of LosslessCut.<br />
            <span style={{ opacity: 0.5, fontWeight: 'bold' }}>{new Date(latestWorkflow.createdAt).toLocaleString()}</span><br />
            <span style={{ opacity: 0.5 }}>{latestWorkflow.headSha} ({latestWorkflow.headBranch} branch)</span><br />

            {sortBy(latestWorkflow.artifacts, (a) => a.name).map((artifact) => (
              <div key={artifact.id}>
                <a href={artifact.url}>{artifact.name} ({(artifact.size / 1024 / 1024).toFixed(1)} MB)</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
