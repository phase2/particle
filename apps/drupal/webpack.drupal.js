/**
 * Drupal-specific webpack config.
 */

const path = require('path');
const { DefinePlugin } = require('webpack');

// Plugins
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RunScriptAfterEmit = require('../../tools/webpack/run-script-after-emit');

// Particle base settings
const { particlize } = require('../../particle');

// Environment
// const { NODE_ENV } = process.env;

const shared = {
  entry: {
    'drupal-jquery': [path.resolve(__dirname, 'drupal-jquery.js')],
    'app-drupal': [path.resolve(__dirname, 'index.js')],
  },
  plugins: [
    new DefinePlugin({
      BUILD_TARGET: JSON.stringify('drupal'),
    }),
  ],
};

const dev = {
  stats: {
    children: false,
    entrypoints: false,
  },
  plugins: [
    new RunScriptAfterEmit({
      exec: [
        // prettier-ignore
        `echo \n🚀 Webpack Drupal ${process.env.NODE_ENV} build complete! 
        Edit apps/drupal/webpack.drupal.js to replace this line with 
        'drupal cr all' now. 🚀\n`,
      ],
    }),
  ],
};

const prod = {};

module.exports = particlize({ shared, dev, prod }, 'extract');
