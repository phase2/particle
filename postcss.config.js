/**
 * PostCSS config
 */

const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');
// const rtl = require('postcss-rtl')
const hexrgba = require('postcss-hexrgba');

module.exports = ({ options, env }) => {
  return {
    plugins: [
      // tailwindConfig is set per *design system* webpack.config.js.
      options.tailwindConfig && tailwindcss(options.tailwindConfig),
      autoprefixer,
      // Hex in rgba like Sass
      hexrgba(),
      // postcss-rtl used for RTL classes on development.
      // ((env === 'development' || options.rtl) && rtl()),
      // Purge CSS classes not referenced in twig
      env === 'production' &&
        options.purgeCssConfig &&
        purgecss(options.purgeCssConfig),
      // Use .browserslistrc to determine CSS mutations
      postcssPresetEnv(),
      // Heavy processing for production
      env === 'production' && cssnano(),
    ],
  };
};
