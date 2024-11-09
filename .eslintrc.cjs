// eslint-disable-next-line no-undef
module.exports = {
  extends: ['mifi'],

  overrides: [
    // In react/web code
    {
      files: ['./src/**/*.{js,mjs,cjs,mjs,jsx,ts,mts,tsx}', './docosaurus.config.ts', './makeBlogpost.mts', './.eslintrc.cjs'],
      env: {
        node: false,
        browser: true,
      },
    },
  ],
};
