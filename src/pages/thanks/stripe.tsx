import { CSSProperties } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';


const testMode = false;

const wrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 0 auto',
  maxWidth: 800,
  padding: '40px 40px 0 40px',
};

export const chinaPayUrl = testMode ? 'https://donate.stripe.com/test_28o7uu1wOayg664dR0' : 'https://donate.stripe.com/5kAdS60q54svbQsfZ9';

export default function Stripe() {
  return (
    <Layout title="Stripe donation">
      <div style={wrapperStyle}>
        <h1 style={{ fontWeight: 300, fontSize: '3em' }}>Stripe donation</h1>

        <p style={{ textAlign: 'center' }}>If you would like to support my free / open source work via stripe, please select an option below.</p>

        <p style={{ textAlign: 'center' }}><b>Thank you! 🙏</b></p>

        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center', gap: '.4em', fontSize: '1.3em' }}>
          <Link to={testMode ? 'https://donate.stripe.com/test_00waEYc6i3udaC7duSco00b' : 'https://donate.stripe.com/fZufZifiu7Kt5hN3Uico00c'}>Donation</Link>

          <Link to={testMode ? 'https://donate.stripe.com/test_fZufZifiu7Kt5hN3Uico00c' : 'https://donate.stripe.com/7sY6oI8U69SB6lR8ayco00d'}>Monthly support</Link>

          <Link to={chinaPayUrl}>WeChat Pay / 微信支付</Link>
        </div>

        <Link style={{ margin: '30px 0' }} to="/thanks">Back</Link>
      </div>
    </Layout>
  );
}
