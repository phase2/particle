const postcssPresetEnv = require('postcss-preset-env');
const tailwindcss = require('tailwindcss');

module.exports = ({ options }) => {
  return {
    plugins: [
      options.tailwindConfig && tailwindcss(options.tailwindConfig),
      // Uses .browserslistrc to figure out which prefixes to add. CSS Grid has
      // special considerations:
      //   https://github.com/postcss/autoprefixer#does-autoprefixer-polyfill-grid-layout-for-ie
      postcssPresetEnv(),
    ],
  };
};
