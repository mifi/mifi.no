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

export default function Stripe() {
  return (
    <Layout title="Stripe donation">
      <div style={wrapperStyle}>
        <h1 style={{ fontWeight: 300, fontSize: '3em' }}>Stripe donation</h1>

        <p style={{ maxWidth: 400 }}>If you would like to support my free / open source work via stripe, please select an option below. <b>Thank you.</b></p>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ margin: '20px 40px' }}>
            <h2 style={{ fontWeight: 300 }}>Monthly support</h2>
            <Link to={testMode ? 'https://donate.stripe.com/test_fZufZifiu7Kt5hN3Uico00c' : 'https://donate.stripe.com/7sY6oI8U69SB6lR8ayco00d'}>monthly support</Link>
          </div>

          <div style={{ margin: '20px 40px' }}>
            <Link to={testMode ? 'https://donate.stripe.com/test_00waEYc6i3udaC7duSco00b' : 'https://donate.stripe.com/fZufZifiu7Kt5hN3Uico00c'}>Donation</Link>
            <Link to={testMode ? 'https://donate.stripe.com/test_28o7uu1wOayg664dR0' : 'https://donate.stripe.com/5kAdS60q54svbQsfZ9'}>WeChat Pay / 微信支付</Link>
          </div>
        </div>

        <Link style={{ margin: '30px 0' }} to="/thanks">Back</Link>
      </div>
    </Layout>
  );
}
