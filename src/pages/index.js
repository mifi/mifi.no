import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { FaNpm } from 'react-icons/fa';

import styles from './index.module.css';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Personal website of Mikael Finstad"
    >
      <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
        <div style={{ textTransform: 'uppercase', fontSize: 40, fontWeight: 500, lineHeight: '1em' }}>mifi.no</div>
        <div style={{ textTransform: 'uppercase', fontSize: 20, fontWeight: 300, color: '#999', marginBottom: 30 }}>Mikael Finstad</div>

        <div style={{ padding: '0px 10px 0px 10px', textAlign: 'center', lineHeight: '1.6em' }}>
          <p>
            <div><Link to="https://github.com/mifi/" className={styles.nicelink}>💙 Free software creator</Link></div>
            <div>👨‍💻 Software consultant</div>
            <div>🌋 <Link to="https://www.instagram.com/mifi.no/" className={styles.nicelink}>Traveller &amp; adventurer</Link></div>
          </p>
        </div>

        <p style={{ margin: '30px 0', width: 600, maxWidth: '100%', textAlign: 'center' }}>
          I create free and open source software to share with the world because<br />I believe software should be available to everyone.
        </p>

        <p style={{ textAlign: 'center', marginBottom: 50 }}><Link to="/thanks" className={styles.nicelink} style={{ fontSize: 30, fontWeight: 200 }}>Thanks to my supporters ❤️</Link></p>

        <a href="/ukraine/" target="_blank" rel="noopener noreferrer"><img title="Slava Ukraini" src="ukraine/ukraine.svg" style={{ width: 150, marginTop: 100, marginBottom: 100 }} /></a>

        <div style={{ padding: '0 20px', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ margin: '40px 0', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <a href="/losslesscut/" target="_blank" rel="noopener noreferrer">
              <img src="https://static.mifi.no/losslesscut.svg" alt="LosslessCut" style={{ width: 100, marginBottom: 10 }} />
            </a>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginTop: 5 }}><a href="/losslesscut/" target="_blank" rel="noopener noreferrer" className={styles.nicelink} style={{ fontSize: 30, fontWeight: 300 }}>
                LosslessCut
              </a></div>

              <p>Get it from your favorite store:</p>
              {/* <span style={{ fontWeight: 800, lineHeight: '3em', color: '#d05b5a' }}>50% off until May 1st 2020</span> */}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link className={styles.appStore} style={{ margin: '0 2px' }} to="https://apps.apple.com/app/id1505323402"><img src="https://github.com/mifi/lossless-cut/raw/master/mac-app-store-badge.svg?sanitize=true" alt="Mac App Store" height="50"/></Link>
              <Link className={styles.appStore} style={{ borderRadius: 13, margin: '0 2px' }} to="https://www.microsoft.com/store/apps/9P30LSR4705L?cid=storebadge&ocid=badge"><img src="https://github.com/mifi/lossless-cut/raw/master/ms-store-badge.svg?sanitize=true" alt="MS badge" height="50"/></Link>
              <Link className={styles.appStore} style={{ borderRadius: 13, margin: '0 2px' }} to="https://snapcraft.io/losslesscut"><img src="https://snapcraft.io/static/images/badges/en/snap-store-black.svg" alt="Snapcraft" height="50"/></Link>
            </div>
          </div>

          <h1 className={styles.heading}>More Apps</h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
            <Link className={styles.app} to="https://mifi.github.io/SimpleInstaBot"><span className={styles.appIcon}>🤖</span> SimpleInstaBot</Link>
            <Link className={styles.app} to="https://github.com/mifi/editly"><span className={styles.appIcon}>🎬</span> EDITLY</Link>
            <Link className={styles.app} to="https://github.com/mifi/ezshare"><span className={styles.appIcon}>🤝</span> EzShare</Link>
            <Link className={styles.app} to="https://github.com/mifi/VideoGrader"><span className={styles.appIcon}>🎨</span> VideoGrader</Link>
          </div>

          <h1 className={styles.heading}>JS modules</h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '0 auto 100px auto', maxWidth: 1000 }}>
            {[
              'reactive-video', 'build-electron', 'instauto', 'react-lottie-player', 'telldus-api', 'stacktracify', 'cognito-backup', 'dynamodump', 'ical-expander', 'hls-vod', 'libxcomfort', 'cordova-xml', 'form-encode-object', 'error-handler-json'
            ].map((project) => (
              <Link to={`https://github.com/mifi/${project}`} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}><FaNpm color="rgb(206 0 0)" style={{ marginRight: 4 }} /> {project}</Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'black', padding: 6, marginTop: 40 }}>
        <div className={styles.instafeed}>
          <Link to="https://www.youtube.com/watch?v=Zv5RvLhCz4M" style={{ display: 'block' }}><video className={styles.vidBlock} src="https://static.mifi.no/Zv5RvLhCz4M-small.mp4" playsinline preload="none" autoplay="autoplay" loop muted></video></Link>
          <Link to="https://www.youtube.com/watch?v=uQIv8Vo9_Jc" style={{ display: 'block' }}><video className={styles.vidBlock} src="https://static.mifi.no/uQIv8Vo9_Jc-small.mp4" playsinline preload="none" autoplay="autoplay" loop muted></video></Link>
          <Link to="https://www.youtube.com/watch?v=qnDpUbggHHQ" style={{ display: 'block' }}><video className={styles.vidBlock} src="https://static.mifi.no/qnDpUbggHHQ-small.mp4" playsinline preload="none" autoplay="autoplay" loop muted></video></Link>
        </div>
      </div>
      </>
    </Layout>
  );
}
