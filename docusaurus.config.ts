// eslint-disable-next-line import/no-import-module-exports
import { Config } from '@docusaurus/types';
// eslint-disable-next-line import/no-import-module-exports
import type * as Preset from '@docusaurus/preset-classic';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dark: darkCodeTheme, light: lightCodeTheme } = require('prism-react-renderer');


const config: Config = {
  title: 'mifi.no',
  tagline: 'Mikael Finstad',
  url: 'https://mifi.no',
  baseUrl: '/',
  trailingSlash: true, // Using trailing slash in S3/CloudFront
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'favicon.ico',
  markdown: {
    format: 'detect',
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'mifi', // Usually your GitHub org/user name.
  projectName: 'mifi.no', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    // Cloudflare Web Analytics
    ...(process.env['NODE_ENV'] === 'production' ? [{
      tagName: 'script',
      attributes: {
        async: 'true',
        src: 'https://static.cloudflareinsights.com/beacon.min.js',
        'data-cf-beacon': '{"token": "98d127ff8c6044e1803f892b89fec233"}',
      },
    }] : []),
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          editUrl: 'https://github.com/mifi/mifi.no/tree/master/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/mifi/mifi.no/tree/master/',
          blogSidebarCount: 50,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'mifi.no',
      logo: {
        alt: 'Logo',
        src: 'logo.svg',
      },
      items: [
        {
          to: '/docs',
          label: 'Knowledge',
          position: 'left',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          to: '/tools',
          label: 'Tools',
          position: 'left',
        },
        {
          to: '/thanks',
          label: '🪙 Donate',
          position: 'left',
        },
        {
          href: 'https://mifi.no/losslesscut/',
          label: 'LosslessCut',
          position: 'right',
        },
        {
          href: 'https://github.com/mifi',
          label: 'GitHub',
          position: 'right',
        },
        {
          label: 'genocide.no',
          href: 'https://genocide.no/',
          style: { backgroundColor: '#e62727b9', color: 'white' },
          // type: 'html',
          // value: '<a href="https://genocide.no/" target="_blank" rel="noopener noreferrer"><span style="color: #E62727; background-color: black; padding: .07em; border-radius: .2em">genocide<span style="color: white">.</span></span><span style="color: white; background-color: #E62727; padding: .07em; border-radius: .2em">no</span></a>',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        src: 'logo.svg',
        width: 30,
      },
      links: [
        {
          title: 'Follow',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/mifi_no',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/c/mikaelfinstad',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/mifi',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/mifi.no/',
            },
            {
              label: 'Product Hunt',
              href: 'https://www.producthunt.com/@mifi',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/users/6519037/mikael-finstad',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Knowledge',
              to: '/docs',
            },
            {
              label: 'Free wallpapers',
              to: 'https://mifi.no/wp/',
            },
            {
              to: 'https://miffy.no/',
              label: 'miffy.no',
            },
            {
              label: 'genocide.no',
              to: 'https://genocide.no/',
            },
            {
              label: 'Mail me',
              to: 'mailto:mikael@mifi.no',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Mikael Finstad 🇳🇴 Docusaurus`,
    },
    image: 'https://static.mifi.no/og-image.jpg',
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  } satisfies Preset.ThemeConfig,
};

module.exports = config;
