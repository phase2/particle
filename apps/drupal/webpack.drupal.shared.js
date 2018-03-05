/**
 * Drupal-specific webpack config common to dev and prod.
 */

const path = require('path');
const webpack = require('webpack');

const drupal = {
  entry: {
    'app-drupal': [
      path.resolve(__dirname, 'index.js'),
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

module.exports = drupal;
