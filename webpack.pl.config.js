/**
 * Pattern Lab-specific webpack config
 * This is merged over top of webpack.shared.config.js
 */

// Library Imports
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

// Custom Imports
const shared = require('./webpack.shared.config');
const { PATH_PL } = require('./config');

// Webpack Entry Points
const pl = {
  entry: {
    'app-pl': [
      path.resolve(__dirname, PATH_PL, 'index.js'),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('pl'),
    }),
  ],
};

module.exports = merge(shared, pl);
