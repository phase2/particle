/**
 * Drupal-specific webpack config common to dev and prod.
 */

const path = require('path');
const webpack = require('webpack');

const drupal = {
  entry: {
    'drupal-jquery': [
      path.resolve(__dirname, 'drupal-jquery.js'),
    ],
    'app-drupal': [
      path.resolve(__dirname, 'index.js'),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('drupal'),
    }),
  ],
};

module.exports = drupal;
