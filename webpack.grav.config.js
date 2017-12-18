/**
 * Grav-specific webpack config
 * This is merged over top of webpack.shared.config.js
 */

// Library Imports
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

// Custom Imports
const shared = require('./webpack.shared.config');
const { PATH_GRAV } = require('./config');

const grav = {
  entry: {
    'app-grav': [
      path.resolve(__dirname, PATH_GRAV, 'index.js'),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('grav'),
    }),
  ],
};

module.exports = merge(shared, grav);

