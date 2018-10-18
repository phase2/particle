/**
 * Drupal-specific webpack config.
 */

const path = require('path');
const { DefinePlugin } = require('webpack');

// Plugins
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RunScriptAfterEmit = require('../../tools/webpack/run-script-after-emit');

// Constants: environment
const { NODE_ENV } = process.env;
// Constants: root
const { PATH_DIST } = require('../../config');
// Constants: app
const { APP_NAME } = require('./config');

// Design system
const designSystem = require('../../source/default/webpack.default');

// Particle base settings
const particle = require('../../particle');

const shared = {
  entry: {
    'drupal-jquery': [path.resolve(__dirname, 'drupal-jquery.js')],
    [APP_NAME]: [path.resolve(__dirname, 'index.js')],
  },
  output: {
    path: path.resolve(PATH_DIST, `${APP_NAME}/assets`),
    publicPath: `${APP_NAME}/assets`,
  },
  plugins: [
    new DefinePlugin({
      BUILD_TARGET: JSON.stringify(APP_NAME),
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
        `echo \n🚀 Webpack Drupal ${NODE_ENV} build complete! 
        Edit apps/drupal/webpack.drupal.js to replace this line with 
        'drupal cr all' now. 🚀\n`,
      ],
    }),
  ],
};

const prod = {
  stats: {
    children: false,
    entrypoints: false,
  },
};

module.exports = particle(
  // app
  { shared, dev, prod },
  // Default design system
  designSystem,
  // Use extract css
  {
    cssMode: 'extract',
    entry: 'app-drupal', // Called out specifically because 2 entry points
  }
);
