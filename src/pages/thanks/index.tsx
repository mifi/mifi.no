import React, { CSSProperties, ReactNode, useEffect } from 'react';
import { FaGithubAlt, FaHeart } from 'react-icons/fa';
import { CgOpenCollective } from 'react-icons/cg';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

// https://confettijs.org/
import Confetti from '../../confetti.min.js'


const wrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 0 auto',
  maxWidth: 800,
  padding: '40px 40px 0 40px',
};

const supporterStyle: CSSProperties = {
  padding: '4px 0',
  display: 'flex',
  alignItems: 'center',
  margin: '10px 40px',
}

const linkStyle: CSSProperties = {
  textDecoration: 'none',
  color: 'crimson',
}

const SupporterInner = ({ children, link }: {
  children?: ReactNode,
  link?: string | undefined,
}) => (link ? (
  <Link style={{ ...supporterStyle, ...linkStyle }} to={link}>{children}</Link>
) : (
  <div style={supporterStyle}>{children}</div>
));

const Supporter = ({ icon, name, link, children }: {
  icon?: ReactNode,
  name: string,
  link?: string,
  children?: ReactNode,
}) => {

  return (
    <SupporterInner link={link}>
      {icon}
      <span style={{ marginLeft: '.4em' }}>{name}</span>
      {children}
    </SupporterInner>
  );
}

export default function Thanks() {
  useEffect(() => {
    // @ts-expect-error not sure how
    const confetti = new Confetti({ target: 'my-canvas', max: 300 });
    confetti.render();
    return () => {
      confetti.destroyTarget?.(true);
    }
  }, []);

  return (
    <Layout title="Thanks!">
      <canvas id="my-canvas" style={{ position: 'fixed', pointerEvents: 'none', opacity: 0.3 }}></canvas>

      <div style={wrapperStyle}>
        <div style={{ margin: '.3em 0', fontSize: 50, fontWeight: 200 }}>Thanks!</div>

        <p style={{ maxWidth: 600 }}>I would like to thank all the people who donated to me and all the kind words I have received from strangers all around the world. It really keeps me going so I can continue making free software ❤️</p>

        <div style={{ zIndex: 1, maxWidth: 600, backgroundColor: 'rgba(243, 244, 237, 0.6)', color: 'black', padding: 10, borderRadius: 5, marginTop: 10, marginBottom: 40 }}>
          <div style={{ fontWeight: 'bold', marginBottom: 10 }}>Want to support my free work?</div>
          <div style={{ marginBottom: 10 }}>
            <Link style={{ ...linkStyle, color: '#1e6f5c', fontWeight: 'bold' }} to="https://paypal.me/mifino/usd">PayPal</Link>{' | '}
            <Link style={{ ...linkStyle, color: '#1e6f5c' }} to="https://github.com/sponsors/mifi">GitHub sponsors</Link>{' | '}
            <Link style={{ ...linkStyle, color: '#1e6f5c' }} to="stripe">Stripe</Link>{' | '}
            <Link style={{ ...linkStyle, color: '#1e6f5c' }} to="stripe">微信支付</Link>{' | '}
            <Link style={{ ...linkStyle, color: '#1e6f5c' }} to="https://opencollective.com/losslesscut">OpenCollective</Link>
          </div>
          <div style={{ fontWeight: 'bold' }}>Bitcoin:</div>
          <div style={{ wordBreak: 'break-all', marginBottom: 10 }}><a style={linkStyle} href="bitcoin:197wMK3YkwFgqrmRQbMgFb4ADCX6q6FiMW">197wMK3YkwFgqrmRQbMgFb4ADCX6q6FiMW</a></div>
          <div style={{ fontWeight: 'bold' }}>Ethereum</div>
          <div style={{ wordBreak: 'break-all', marginBottom: 10 }}>0xd1F16720A11ea0a1501A0DBe85F85174CB13b2b3</div>
          <div style={{ fontWeight: 'bold' }}>Monero:</div>
          <div style={{ wordBreak: 'break-all' }}>42MMTGjJhPs5ZtBg1KcYZhghfwyAvq4WsW5Nk2Z6XbYjBbmqMnZJ43QiYsAfNV2sdCMkFErqSe71tHyQcZr4dDntJsX6NPH</div>
        </div>
      </div>

      <p style={{ textAlign: 'center' }}>
        Below is a list of my <Link style={linkStyle} to="https://github.com/sponsors/mifi">GitHub sponsors</Link>, <Link style={linkStyle} to="https://www.patreon.com/mifmif">Patreons</Link> and generous contributors:
      </p>

      <div style={{ marginTop: 60, marginBottom: 80, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FaHeart style={{ color: '#EB1D36' }} size={40} />
      </div>

      <div style={{ margin: '0 auto', fontSize: 28, display: 'flex', flexWrap: 'wrap', maxWidth: 1000 }}>
        <Supporter link="https://github.com/t3dotgg" icon={<FaGithubAlt />} name="@t3dotgg" />
        <Supporter link="https://github.com/nick2i" icon={<FaGithubAlt />} name="@nick2i" />
        <Supporter link="https://github.com/msarahan" icon={<FaGithubAlt />} name="@msarahan" />
        <Supporter link="https://unli.xyz/" icon={<span>🎉</span>} name="Jacob Chapman" />
        <Supporter link="https://github.com/sparanoid" icon={<FaGithubAlt />} name="@sparanoid" />
        <Supporter link="https://github.com/SignpostMarv" icon={<FaGithubAlt />} name="@SignpostMarv" />
        <Supporter icon={<span>🎉</span>} name="RB Evans" />
        <Supporter link="https://www.patreon.com/user?u=10565003" icon={<span>🎉</span>} name="BraveFart" />
        <Supporter link="https://opencollective.com/jimmy-gee" icon={<CgOpenCollective />} name="Jimmy Gee" />
        <Supporter link="https://opencollective.com/bigbeno37" icon={<CgOpenCollective />} name="bigbeno37" />
        <Supporter link="https://github.com/scuba-tech" icon={<FaGithubAlt />} name="@scuba-tech" />
        <Supporter link="https://github.com/mandrael" icon={<FaGithubAlt />} name="@mandrael" />
        <Supporter link="https://github.com/JamesSwift" icon={<FaGithubAlt />} name="@JamesSwift" />
        <Supporter link="https://github.com/derekh4" icon={<FaGithubAlt />} name="@derekh4" />
      </div>

      <div style={{ marginTop: 80, marginBottom: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FaHeart style={{ color: '#EB1D36' }} size={40} />
      </div>
    </Layout>
  );
}
