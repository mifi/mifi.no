import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './403.module.css';


export default function Error() {
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
