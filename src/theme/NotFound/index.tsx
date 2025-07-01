import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import type NotFoundType from '@theme/NotFound';
import type { WrapperProps } from '@docusaurus/types';

import styles from './index.module.css';

type Props = WrapperProps<typeof NotFoundType>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NotFoundWrapper(_props: Props): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  const errorCode = 403;

  return (
    <Layout
      title={siteConfig.title}
      description={String(errorCode)}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', margin: '10em' }}>
        <div style={{ fontSize: '4em', margin: '-.5em' }}>😵</div>
        <div className={styles['code']}>{errorCode}</div>
      </div>
    </Layout>
  );
}
