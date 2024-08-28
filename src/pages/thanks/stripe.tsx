import React, { CSSProperties } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './stripe.module.css';


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
            <ul className={styles['optionList']}>
              <li>
                <Link to={testMode ? 'https://buy.stripe.com/test_fZeaGGdfwgWEgKIcMR' : 'https://buy.stripe.com/7sI7tIegVaQT8EgcMQ'}>100$ / month</Link>
              </li>
              <li>
                <Link to={testMode ? 'https://buy.stripe.com/test_7sIaGG8Zg6i03XWaEK' : 'https://buy.stripe.com/eVa5lA0q53or7Ac6or'}>50$ / month</Link>
              </li>
              <li>
                <Link to={testMode ? 'https://buy.stripe.com/test_4gw6qqfnEeOweCA9AH' : 'https://buy.stripe.com/3cscO2gp3aQTg6I3ce'}>20$ / month</Link>
              </li>
              <li>
                <Link to={testMode ? 'https://buy.stripe.com/test_5kA9CCejA7m46647sA' : 'https://buy.stripe.com/4gwg0e2yd0cf07K145'}>10$ / month</Link>
              </li>
              <li>
                <Link to={testMode ? 'https://buy.stripe.com/test_cN2bKK7VceOwgKI009' : 'https://buy.stripe.com/00g15k5Kp0cfg6I6oo'}>5$ / month</Link>
              </li>
            </ul>
          </div>

          <div style={{ margin: '20px 40px' }}>
            <h2 style={{ fontWeight: 300 }}>One-time donation</h2>
            <ul className={styles['optionList']}>
              <li>
                <Link to={testMode ? 'https://donate.stripe.com/test_cN29CCfnE5dW3XWbII' : 'https://donate.stripe.com/9AQ6pEfkZ4sv3jW009'}>100$ one-time</Link>
              </li>
              <li>
                <Link to={testMode ? 'https://donate.stripe.com/test_8wMdSS7Vc6i0eCA3cd' : 'https://donate.stripe.com/6oE5lAa0FbUXg6IcMU'}>50$ one-time</Link>
              </li>
              <li>
                <Link to={testMode ? 'https://donate.stripe.com/test_bIY5mm8Zg6i06645km' : 'https://donate.stripe.com/8wMcO27Sx2kn6w8007'}>20$ one-time</Link>
              </li>
              <li>
                <Link to={testMode ? 'https://donate.stripe.com/test_fZe022b7o7m40LKdQT' : 'https://donate.stripe.com/aEUaFUb4J1gjaMo5kq'}>10$ one-time</Link>
              </li>
              <li>
                <Link to={testMode ? 'https://donate.stripe.com/test_8wMcOOgrI8q8dyw9AE' : 'https://donate.stripe.com/9AQbJY6Ot2knf2E3ch'}>5$ one-time</Link>
              </li>
              <li style={{ marginTop: '1em' }}>
                <Link to={testMode ? 'https://donate.stripe.com/test_28o7uu1wOayg664dR0' : 'https://donate.stripe.com/5kAdS60q54svbQsfZ9'}>WeChat Pay / 微信支付</Link>
              </li>
            </ul>
          </div>
        </div>

        <Link style={{ margin: '30px 0' }} to="/thanks">Back</Link>
      </div>
    </Layout>
  );
}
