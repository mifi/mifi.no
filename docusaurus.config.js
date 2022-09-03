// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'mifi.no',
  tagline: 'Mikael Finstad',
  url: 'https://mifi.no',
  baseUrl: '/',
  trailingSlash: true, // Using trailing slash in S3/CloudFront
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'favicon.ico',

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

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/mifi/mifi.no/tree/master/',
          blogSidebarCount: 50,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'mifi.no',
        logo: {
          alt: 'Logo',
          src: 'logo.svg',
        },
        items: [
          {
            to: '/blog',
            label: 'Blog',
            position: 'left',
          },
          {
            to: '/thanks',
            label: 'Thanks',
            position: 'left',
          },
          {
            href: 'https://mifi.no/losslesscut/',
            label: 'LosslessCut',
            position: 'left',
          },
          {
            href: 'https://github.com/mifi',
            label: 'GitHub',
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
                label: 'Free wallpapers',
                to: 'https://static.mifi.no/wp',
              },
              {
                label: 'Mail me',
                to: 'mailto:mikael@yankee.no',
              }
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Mikael Finstad ❤️ Docusaurus`,
      },
      image: 'https://static.mifi.no/og-image.jpg',
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
