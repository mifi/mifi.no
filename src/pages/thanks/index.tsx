import { CSSProperties, ReactNode, useEffect } from 'react';
import { FaGithubAlt, FaHeart } from 'react-icons/fa';
import { CgOpenCollective, CgPatreon } from 'react-icons/cg';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import orderBy from 'lodash/orderBy';

import { Sponsor } from '@site/src/types';

// https://confettijs.org/
import Confetti from '../../confetti.min.js';
import { chinaPayUrl } from './stripe';

import autoSponsorsRaw from './sponsors.json';

const autoSponsors = autoSponsorsRaw as Sponsor[];


// https://github.com/sponsors/mifi/dashboard/your_sponsors -> Click "Export" -> "All time" -> "File format: JSON" -> "Start export"
// https://www.patreon.com/members -> Click "CSV"
// https://opencollective.com/dashboard/losslesscut/transactions -> Click "Export CSV" -> "Selected export set: Platform Default" -> "Export CSV"
// Run:
// yarn process-sponsors ~/Downloads/mifi-sponsorships-all-time.json ~/Downloads/*-members-5520754-mifmif.csv  ~/Downloads/losslesscut-transactions.csv

const oneTime: Omit<Sponsor, 'id' | 'type'>[] = [
  { active: true, recurring: false, from: '2020-04-25', until: '2020-04-25', totalAmount: 500, name: 'Jacob Chapman', url: 'https://unli.xyz/' },
];

const allSponsors = [
  ...autoSponsors,
  ...oneTime.map((o) => ({ ...o, id: `other_${o.name}`, type: 'other' as const })),
];

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
  padding: '.2em 0',
  display: 'flex',
  alignItems: 'center',
};

const linkStyle: CSSProperties = {
  textDecoration: 'none',
  color: 'crimson',
};

function getIcon(type: Sponsor['type']) {
  if (type === 'opencollective') return <CgOpenCollective />;
  if (type === 'github') return <FaGithubAlt />;
  if (type === 'patreon') return <CgPatreon />;
  return <span>🎉</span>;
}

const SupporterInner = ({ children, link, style }: {
  children?: ReactNode,
  link?: string | undefined,
  style?: CSSProperties,
}) => (link ? (
  <Link style={{ ...supporterStyle, ...linkStyle, ...style }} to={link}>{children}</Link>
) : (
  <div style={{ ...supporterStyle, ...style }}>{children}</div>
));

function SupporterView({ supporter, children }: {
  supporter: Sponsor,
  children?: ReactNode,
}) {
  return (
    <SupporterInner link={supporter.url} style={{ fontSize: `${Math.min(1.7, Math.max(1, supporter.totalAmount / 200))}em` }}>
      {getIcon(supporter.type)}
      <div style={{ marginLeft: '.2em' }}>
        <div style={{ marginBottom: '-0.4em' }}>{supporter.name}</div>
        {children}
      </div>
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
    };
  }, []);

  return (
    <Layout title="Thank you">
      <canvas id="my-canvas" style={{ position: 'fixed', pointerEvents: 'none', opacity: 0.3 }} />

      <div style={wrapperStyle}>
        <div style={{ margin: '.3em 0', fontSize: 50, fontWeight: 200 }}>Thank you</div>

        <p style={{ maxWidth: 600 }}>I would like to thank all the people who donated to me and all the kind words I have received from strangers all around the world. It really keeps me going so I can continue making free software ❤️</p>

        <div style={{ zIndex: 1, maxWidth: 600, backgroundColor: 'rgba(243, 244, 237, 0.6)', color: 'black', padding: 10, borderRadius: 5, marginTop: 10, marginBottom: 40 }}>
          <div style={{ fontWeight: 'bold', marginBottom: 10 }}>Want to support my free software work?</div>
          <div style={{ marginBottom: 10 }}>
            <Link style={{ ...linkStyle, color: '#1e6f5c', fontWeight: 'bold' }} to="https://paypal.me/mifino/usd">PayPal</Link>{' | '}
            <Link style={{ ...linkStyle, color: '#1e6f5c' }} to="https://github.com/sponsors/mifi">GitHub sponsors</Link>{' | '}
            <Link style={{ ...linkStyle, color: '#1e6f5c' }} to="stripe">Stripe</Link>{' | '}
            <Link style={{ ...linkStyle, color: '#1e6f5c' }} to="https://opencollective.com/losslesscut">OpenCollective</Link>{' | '}
            <Link style={linkStyle} to="https://www.patreon.com/mifmif">Patreon</Link>
          </div>
          <div style={{ fontWeight: 'bold' }}>China</div>
          <div style={{ wordBreak: 'break-all', marginBottom: 10 }}><Link style={{ ...linkStyle, color: '#1e6f5c' }} to={chinaPayUrl}>微信支付 (WeChat Pay), 支付宝 (Alipay)</Link></div>
          <div style={{ fontWeight: 'bold' }}>Bitcoin</div>
          <div style={{ wordBreak: 'break-all', marginBottom: 10 }}><a style={linkStyle} href="bitcoin:197wMK3YkwFgqrmRQbMgFb4ADCX6q6FiMW">197wMK3YkwFgqrmRQbMgFb4ADCX6q6FiMW</a></div>
          <div style={{ fontWeight: 'bold' }}>Ethereum</div>
          <div style={{ wordBreak: 'break-all', marginBottom: 10 }}>0xd1F16720A11ea0a1501A0DBe85F85174CB13b2b3</div>
          <div style={{ fontWeight: 'bold' }}>Monero:</div>
          <div style={{ wordBreak: 'break-all' }}>42MMTGjJhPs5ZtBg1KcYZhghfwyAvq4WsW5Nk2Z6XbYjBbmqMnZJ43QiYsAfNV2sdCMkFErqSe71tHyQcZr4dDntJsX6NPH</div>
        </div>
      </div>

      <p style={{ textAlign: 'center' }}>
        Below is a list of my <Link style={linkStyle} to="https://github.com/sponsors/mifi">GitHub sponsors</Link>, <Link to="https://opencollective.com/losslesscut">OpenCollective supporters</Link>, <Link style={linkStyle} to="https://www.patreon.com/mifmif">Patreons</Link> and generous contributors:
      </p>

      <div style={{ marginTop: 50, marginBottom: 50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FaHeart style={{ color: '#EB1D36' }} size={40} />
      </div>

      <div style={{ margin: '0 auto', padding: '1em', fontSize: 26, display: 'flex', justifyContent: 'center', gap: '1em 2em', flexWrap: 'wrap', maxWidth: 1000 }}>
        {orderBy(allSponsors.filter((s) => s.active), [(s) => s.totalAmount, (s) => s.from], ['desc', 'asc']).map((s) => (
          <SupporterView
            key={s.id}
            supporter={s}
          >
            <div style={{ color: 'rgba(0,0,0,0.3)', fontSize: '0.4em' }}>since {s.from}</div>
          </SupporterView>
        ))}
      </div>

      <div style={{ marginTop: 100, marginBottom: 80, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: '#EB1D36', marginBottom: 50 }}>Past sponsors</h2>

        {orderBy(allSponsors.filter((s) => !s.active && (s.totalAmount >= 20 || s.recurring)), [(s) => s.totalAmount, (s) => s.until ?? s.from], ['desc', 'asc']).map((s) => (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '.5em', fontSize: `${Math.min(4, Math.max(0.9, s.totalAmount / 120))}em` }}>{getIcon(s.type)} {s.name}</div>
        ))}
      </div>

      <div style={{ marginTop: 80, marginBottom: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FaHeart style={{ color: '#EB1D36' }} size={40} />
      </div>
    </Layout>
  );
}
