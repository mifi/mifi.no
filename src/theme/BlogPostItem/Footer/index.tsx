import React from 'react';
import Footer from '@theme-original/BlogPostItem/Footer';
import type FooterType from '@theme/BlogPostItem/Footer';
import type {WrapperProps} from '@docusaurus/types';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import Giscus from '@giscus/react';


type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): JSX.Element {
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
