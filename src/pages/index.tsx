import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { FaGithub, FaNpm } from 'react-icons/fa';
import { useCallback, useRef } from 'react';

import styles from './index.module.css';
import NorwayFlag from './norway.svg';
import PalestineFlag from './palestine.svg';


// https://github.com/mifi?tab=repositories&q=&type=source&language=&sort=stargazers

const githubProjects = [
  'youtube-import-playlist', 'in-app-subscription-example',
];

const npmModules = [
  'jotta', 'cloudwatch-winston', 'mjml-dynamic', 'reactive-video', 'instauto', 'react-lottie-player', 'telldus-api', 'telldus-local-auth', 'stacktracify', 'cognito-backup', 'dynamodump', 'ical-expander', 'hls-vod', 'libxcomfort', 'cordova-xml', 'error-handler-json', 'commonify', 'eslint-config-mifi',
];

const archivedNpmModules = [
  'build-electron', 'form-encode-object',
];

function Project({ name, type } : { name: string, type: 'github' | 'npm' | 'npm-archived' }) {
  const url = type === 'github' ? `https://github.com/mifi/${name}` : `https://www.npmjs.com/package/${name}`;
  return (
    <Link key={name} to={url} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none', opacity: type === 'npm-archived' ? 0.4 : 1 }}>
      {type === 'github' ? (
        <FaGithub style={{ marginRight: 4 }} />
      ) : (
        <FaNpm color="rgb(206 0 0)" style={{ marginRight: 4 }} />
      )}
      {name}
    </Link>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  const palestineRef = useRef<HTMLAnchorElement>(null);
  const ukraineRef = useRef<HTMLAnchorElement>(null);

  const handleNorwayClick = useCallback(() => {
    const animate = (el: HTMLAnchorElement | null) => {
      if (!el) return;
      el.animate([
        { transform: 'scale(1)', offset: 0 },
        { transform: 'scale(1.3)', offset: 0.2 },
        { transform: 'rotate(1)' },
      ], {
        duration: 200,
      });
    };

    animate(palestineRef.current);
    animate(ukraineRef.current);
  }, []);

  return (
    <Layout
      title={siteConfig.title}
      description="Personal website of Mikael Finstad"
    >
      <>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
          <div style={{ textTransform: 'uppercase', fontSize: 40, fontWeight: 500, lineHeight: '1em' }}>mifi.no</div>
          <div style={{ textTransform: 'uppercase', fontSize: 20, fontWeight: 300, color: '#999', marginBottom: 30 }}>Mikael Finstad</div>

          <p style={{ margin: '30px 0', width: 600, maxWidth: '100%', textAlign: 'center' }}>
            I create <Link to="https://github.com/mifi/" className={styles['nicelink']!}>free and open source</Link> software to share with the world because<br />
            I believe software should be available to everyone.<br />
            I love <Link to="https://www.instagram.com/mifi.no/" className={styles['nicelink']!}>🌋 travel and hiking</Link>.
            I write a <Link to="/blog" className={styles['nicelink']!}>📝 blog</Link> and a <Link to="/docs" className={styles['nicelink']!}>📚 knowledge base</Link>.<br />
            <a href="https://miffy.no/" className={styles['nicelink']!} target="_blank" rel="noopener noreferrer">miffy.no</a> 🌈 mini game
          </p>

          <p style={{ textAlign: 'center', marginBottom: 50 }}><Link to="/thanks" style={{ fontSize: 30, fontWeight: 200, color: 'inherit' }}>Thanks to my supporters ❤️</Link></p>

          <div style={{ marginTop: 100, marginBottom: 100, display: 'flex', flexWrap: 'wrap', gap: '1em', fontSize: '1.5em' }}>
            <a ref={palestineRef} href="https://genocide.no/palestine/" target="_blank" rel="noopener noreferrer">
              <PalestineFlag title="Gaza Genocide" style={{ height: '3em', borderRadius: '3%' }} />
            </a>
            <NorwayFlag style={{ height: '3em', borderRadius: '3%', cursor: 'pointer' }} onClick={handleNorwayClick} />
            <a ref={ukraineRef} href="/ukraine/" target="_blank" rel="noopener noreferrer"><img title="Slava Ukraini" alt="" src="ukraine/ukraine.svg" style={{ height: '3em', borderRadius: '3%' }} /></a>
          </div>

          <div style={{ padding: '0 20px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ margin: '40px 0', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <a href="/losslesscut/" target="_blank" rel="noopener noreferrer">
                <img src="https://static.mifi.no/losslesscut.svg" alt="LosslessCut" style={{ width: 100, marginBottom: 10 }} />
              </a>
              <div style={{ textAlign: 'center' }}>
                <div style={{ marginTop: 5 }}>
                  <a href="/losslesscut/" target="_blank" rel="noopener noreferrer" className={styles['nicelink']} style={{ fontSize: 30, fontWeight: 300 }}>
                    LosslessCut
                  </a>
                </div>

                <p>Get it from your favorite store:</p>
                {/* <span style={{ fontWeight: 800, lineHeight: '3em', color: '#d05b5a' }}>50% off until May 1st 2020</span> */}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link className={styles['appStore']!} style={{ margin: '0 2px' }} to="https://www.microsoft.com/store/apps/9P30LSR4705L?cid=storebadge&ocid=badge"><img src="https://github.com/mifi/lossless-cut/raw/master/ms-store-badge.svg?sanitize=true" alt="MS badge" height="50" /></Link>
                <Link className={styles['appStore']!} style={{ margin: '0 2px' }} to="https://apps.apple.com/app/id1505323402"><img src="https://github.com/mifi/lossless-cut/raw/master/mac-app-store-badge.svg?sanitize=true" alt="Mac App Store" height="50" /></Link>
                <Link className={styles['appStore']!} style={{ margin: '0 2px' }} to="https://snapcraft.io/losslesscut"><img src="https://github.com/mifi/lossless-cut/raw/master/snap-store-black.svg?sanitize=true" alt="Snapcraft" height="50" /></Link>
              </div>
            </div>

            <h1 className={styles['heading']}>More Apps</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
              <Link className={styles['app']!} to="https://mifi.github.io/SimpleInstaBot"><span className={styles['appIcon']}>🤖</span> SimpleInstaBot</Link>
              <Link className={styles['app']!} to="https://github.com/mifi/editly"><span className={styles['appIcon']}>🎬</span> EDITLY</Link>
              <Link className={styles['app']!} to="https://github.com/mifi/ezshare"><span className={styles['appIcon']}>🤝</span> EzShare</Link>
              <Link className={styles['app']!} to="https://github.com/mifi/VideoGrader"><span className={styles['appIcon']}>🎨</span> VideoGrader</Link>
            </div>

            <h1 className={styles['heading']}>Projects</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '0 auto 100px auto', maxWidth: 1000 }}>
              {githubProjects.map((project) => <Project key={project} name={project} type="github" />)}
              {npmModules.map((project) => <Project key={project} name={project} type="npm" />)}
              {archivedNpmModules.map((project) => <Project key={project} name={project} type="npm-archived" />)}
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'black', padding: 6, marginTop: 40 }}>
          <div className={styles['instafeed']}>
            <Link to="https://www.youtube.com/watch?v=Zv5RvLhCz4M" style={{ display: 'block' }}><video className={styles['vidBlock']} src="https://static.mifi.no/mifi.no/Zv5RvLhCz4M-small.mp4" playsInline preload="none" autoPlay loop muted /></Link>
            <Link to="https://www.youtube.com/watch?v=uQIv8Vo9_Jc" style={{ display: 'block' }}><video className={styles['vidBlock']} src="https://static.mifi.no/mifi.no/uQIv8Vo9_Jc-small.mp4" playsInline preload="none" autoPlay loop muted /></Link>
            <Link to="https://www.youtube.com/watch?v=qnDpUbggHHQ" style={{ display: 'block' }}><video className={styles['vidBlock']} src="https://static.mifi.no/mifi.no/qnDpUbggHHQ-small.mp4" playsInline preload="none" autoPlay loop muted /></Link>
          </div>
        </div>
      </>
    </Layout>
  );
}
