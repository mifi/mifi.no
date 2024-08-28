import React, { ReactNode } from 'react';
import Head from '@docusaurus/Head';


export default function Root({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>
      {children}
    </>
  );
}
