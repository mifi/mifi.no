import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';


export default function Tools() {
  return (
    <Layout title="Free tools">
      <main style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1em' }}>
        <h1>Free tools</h1>
        <p>Here&apos;s a collection of free web-based tools that I&apos;ve built:</p>
        <ul>
          <li><Link to="currency-calc">Currency calculator</Link></li>
        </ul>
      </main>
    </Layout>
  );
}
