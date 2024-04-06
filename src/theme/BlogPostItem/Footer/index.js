import React from 'react';
import Footer from '@theme-original/BlogPostItem/Footer';
import Giscus from '@giscus/react';

import {useBlogPost} from '@docusaurus/theme-common/lib/internal.js';

export default function FooterWrapper(props) {
  const { isBlogPostPage } = useBlogPost();

  return (
    <>
      <Footer {...props} />
      
      {isBlogPostPage && (
        <Giscus
          repo="mifi/mifi.no"
          repoId="R_kgDOH61uBw"
          category="Announcements"
          categoryId="DIC_kwDOH61uB84CRWKh"
          mapping="pathname"
          strict="1"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="preferred_color_scheme"
          lang="en"
          loading="lazy"
        />
      )}
    </>
  );
}
