/**
 * Pattern Lab-specific webpack config
 * 
 * This is merged over top of webpack.shared.config.js
 */
const merge = require('webpack-merge');
const shared = require('./webpack.shared.config');
const webpack = require('webpack');

// Webpack Entry Points
const pl = {
  entry: {
    'app-pl': [
      './app-pl/index.js',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('pl'),
    }),
  ],
};

module.exports = merge(shared, pl);
