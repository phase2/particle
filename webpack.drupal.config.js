/**
 * Drupal-specific webpack config
 * This is merged over top of webpack.shared.config.js
 */

// Library Imports
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

// Custom Imports
const shared = require('./webpack.shared.config');
const { PATH_DRUPAL } = require('./config');

const drupal = {
  entry: {
    'app-drupal': [
      path.resolve(__dirname, PATH_DRUPAL, 'index.js'),
    ],
  },
  // These will be explicitly be provided OUTSIDE the bundle via a <script> tag in the HTML
  externals: {
    jquery: 'jQuery',
    lodash: '_',
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('drupal'),
    }),
  ],
};

module.exports = merge(shared, drupal);
