import Layout from '@theme/Layout';
import ky from 'ky';
import { useEffect, useState } from 'react';

export default function LosslessCutNightly() {
  const [latestWorkflow, setLatestWorkflow] = useState<{ headSha: string, headBranch: string, createdAt: string, artifacts: { id: number, name: string, url: string, size: number }[] }>();

  useEffect(() => {
    (async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { workflow_runs: workflowRuns } = await ky.get('https://api.github.com/repos/mifi/lossless-cut/actions/workflows/build.yml/runs').json<{ workflow_runs: any[] }>();
      const latestWorkflowResponse = workflowRuns.find((r) => r.conclusion === 'success' && r.status === 'completed');

      if (latestWorkflowResponse) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { artifacts: artifactsResponse } = await ky.get(latestWorkflowResponse.artifacts_url).json<{ artifacts: any[] }>();
        setLatestWorkflow({
          headSha: latestWorkflowResponse.head_sha,
          headBranch: latestWorkflowResponse.head_branch,
          createdAt: latestWorkflowResponse.created_at,
          artifacts: artifactsResponse.map((artifact) => ({
            id: artifact.id,
            url: `${latestWorkflowResponse.html_url}/artifacts/${artifact.id}`,
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
          <div>
            Here is the latest nightly build of LosslessCut.<br />
            <span style={{ opacity: 0.5, fontWeight: 'bold' }}>{new Date(latestWorkflow.createdAt).toLocaleString()}</span><br />
            <span style={{ opacity: 0.5 }}>{latestWorkflow.headBranch} / {latestWorkflow.headSha}</span><br />
            {latestWorkflow.artifacts.map((artifact) => (
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
