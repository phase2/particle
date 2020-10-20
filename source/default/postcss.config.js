/**
 * PostCSS config
 */
const path = require('path');

const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');
const tailwindcss = require('tailwindcss');
const hexrgba = require('postcss-hexrgba');

const tailwWindPath = path.resolve(__dirname, 'tailwind.config.js');

module.exports = ({ mode }) => {
  console.log('postcss running');

  return {
    plugins: [
      // All tailwind config
      tailwindcss(tailwWindPath),
      // Hex in rgba like Sass
      hexrgba(),
      // Use .browserslistrc to determine CSS mutations
      postcssPresetEnv(),
      // Heavy processing for production
      mode === 'production' && cssnano(),
    ],
  };
};
