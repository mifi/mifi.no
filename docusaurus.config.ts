// eslint-disable-next-line import/no-import-module-exports
import { Config } from '@docusaurus/types';
// eslint-disable-next-line import/no-import-module-exports
import type * as Preset from '@docusaurus/preset-classic';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const lightCodeTheme = require('prism-react-renderer/themes/github');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const darkCodeTheme = require('prism-react-renderer/themes/dracula');


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
          customCss: require.resolve('./src/css/custom.css'),
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
          label: 'Free tools',
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
          href: 'https://miffy.no/',
          label: 'miffy.no',
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
              to: '/wp',
            },
            {
              label: 'Mail me',
              to: 'mailto:mikael@yankee.no',
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
