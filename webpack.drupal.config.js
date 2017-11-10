/**
 * Drupal-specific webpack config
 */
const merge = require('webpack-merge');
const shared = require('./webpack.shared.config');
const webpack = require('webpack');

const drupal = {
  entry: {
    'app-drupal': [
      './app-drupal/index.js',
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
