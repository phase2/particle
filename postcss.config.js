const postcssPresetEnv = require('postcss-preset-env');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = ({ options, env }) => {
  return {
    plugins: [
      autoprefixer(),
      options.tailwindConfig && tailwindcss(options.tailwindConfig),
      // Uses .browserslistrc to figure out which prefixes to add. CSS Grid has
      // special considerations:
      //   https://github.com/postcss/autoprefixer#does-autoprefixer-polyfill-grid-layout-for-ie
      env === 'production' &&
        options.purgeCssConfig &&
        purgecss(options.purgeCssConfig),
      postcssPresetEnv(),
    ],
  };
};
