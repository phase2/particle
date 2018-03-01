/**
 * Pattern Lab-specific webpack config
 * This is merged over top of webpack.shared.config.js
 */

// Library Imports
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

// Custom Imports
const shared = require('../../webpack.shared.prod.js');

const pl = {
  entry: {
    'app-pl': [
      path.resolve(__dirname, 'index.js'),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('pl'),
    }),
    new webpack.ProvidePlugin({
      // Bootstrap is dependent on jQuery and Popper
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
  ],
};

module.exports = merge(shared, pl);
