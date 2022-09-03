import React, { useEffect } from 'react';
import { FaGithubAlt, FaHeart } from 'react-icons/fa';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import Confetti from './confetti.min.js'

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 0 auto',
  maxWidth: 800,
  padding: '40px 40px 0 40px',
};

const supporterStyle = {
  padding: '4px 0',
  display: 'flex',
  alignItems: 'center',
  margin: '10px 40px',
}

const linkStyle = {
  textDecoration: 'none',
  color: 'crimson',
}

const Supporter = ({ icon, name, link, children }) => {
  const maybeLink = link ? <Link style={{ ...linkStyle, marginLeft: '.4em' }} to={link}>{name}</Link> : <div style={{ marginLeft: '.4em' }}>{name}</div>;
  return (
    <div style={supporterStyle}>
      {icon}
      {maybeLink}
    </div>
  );
}

export default function Thanks() {
  useEffect(() => {
    const confetti = new Confetti({ target: 'my-canvas', max: 300 });
    confetti.render();
    return () => confetti.destroyTarget(true);
  }, []);

  return (
    <Layout title="Thanks!">
      <canvas id="my-canvas" style={{ position: 'fixed', pointerEvents: 'none', opacity: 0.3 }}></canvas>

      <div style={wrapperStyle}>
        <div style={{ margin: '.3em 0', fontSize: 50, fontWeight: 200 }}>Thanks!</div>

        <p style={{ maxWidth: 600 }}>I would like to thank all the people who donated to me and all the kind words I have received from strangers all around the world. It really keeps me going so I can continue making free software ❤️</p>

        <div style={{ zIndex: 1, maxWidth: 600, backgroundColor: 'rgba(243, 244, 237, 0.6)', color: 'black', padding: 10, borderRadius: 5, marginTop: 10, marginBottom: 40 }}>
          <div style={{ fontWeight: 'bold', marginBottom: 10 }}>Want to support my free work?</div>
          <div style={{ marginBottom: 10 }}><Link style={{ ...linkStyle, color: '#1e6f5c', fontWeight: 'bold' }} to="https://paypal.me/mifino/usd">PayPal</Link> | <Link style={{ ...linkStyle, color: '#1e6f5c' }} to="https://github.com/sponsors/mifi">GitHub sponsors</Link> | <Link style={{ ...linkStyle, color: '#1e6f5c' }} to="stripe">Stripe</Link> | <Link style={{ ...linkStyle, color: '#1e6f5c' }} to="https://opencollective.com/losslesscut">OpenCollective</Link></div>
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
        <Supporter link="https://github.com/thomasbachem" icon={<FaGithubAlt />} name="thomasbachem" />
        <Supporter link="https://github.com/OasisDigital" icon={<FaGithubAlt />} name="OasisDigital" />
        <Supporter link="https://github.com/msarahan" icon={<FaGithubAlt />} name="msarahan" />
        <Supporter link="https://github.com/terasaka2k" icon={<FaGithubAlt />} name="terasaka2k" />
        <Supporter link="https://github.com/peterhighgrove" icon={<FaGithubAlt />} name="peterhighgrove" />
        <Supporter link="https://unli.xyz/" icon={<span>🎉</span>} name="Jacob Chapman" />
        <Supporter link="https://www.patreon.com/user/creators?u=36832428" icon={<span>🎉</span>} name="mav6771" />
        <Supporter link="https://github.com/sparanoid" icon={<FaGithubAlt />} name="sparanoid" />
        <Supporter link="https://www.terranovadance.com/" icon={<span>🎉</span>} name="Formica" />
        <Supporter link="https://github.com/SignpostMarv" icon={<FaGithubAlt />} name="SignpostMarv" />
        <Supporter link="https://www.patreon.com/cj_and_aya" icon={<span>🎉</span>} name="Nick T." />
        <Supporter icon={<span>🎉</span>} name="RB Evans" />
        <Supporter link="https://www.patreon.com/user?u=10565003" icon={<span>🎉</span>} name="BraveFart" />
        <Supporter link="https://github.com/luqmannn" icon={<FaGithubAlt />} name=" luqmannn" />
      </div>

      <div style={{ marginTop: 80, marginBottom: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FaHeart style={{ color: '#EB1D36' }} size={40} />
      </div>
    </Layout>
  );
}
