const merge = require('webpack-merge');
const shared = require('./webpack.shared.config');
const webpack = require('webpack');

// Webpack Entry Points
const pl = {
  entry: {
    // 'design-system': './source/design-system/design-system.js',
    'pattern-lab': [
      './source/pattern-lab.js',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('pl'),
    }),
  ],
};

module.exports = merge(shared, pl);
