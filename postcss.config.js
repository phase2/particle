/**
 * PostCSS config
 */

const path = require('path');

const tailwindcss = require('tailwindcss');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const hexrgba = require('postcss-hexrgba');

const tailWindPath = path.resolve(
  __dirname,
  './source/default/tailwind.config.js'
);

module.exports = ({ mode }) => {
  return {
    plugins: [
      // All tailwind config
      tailwindcss(tailWindPath),
      // Hex in rgba like Sass
      hexrgba(),
      // Use .browserslistrc to determine CSS mutations
      mode === 'production' && postcssPresetEnv(),
      // Heavy processing for production
      mode === 'production' && cssnano(),
    ],
  };
};
