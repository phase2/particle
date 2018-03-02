/**
 * Drupal-specific webpack config
 * This is merged over top of webpack.shared.config.js
 */

// Library Imports
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

// Custom Imports
const shared = require('../../webpack.particle.prod.js');

const drupal = {
  mode: 'production',
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

module.exports = merge(shared, drupal);
