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
      pl: JSON.stringify(true)
    }),
    // new webpack.ProvidePlugin({
    //   'window.Holder': 'holderjs',
    // }),
  ]
};

module.exports = merge(shared, pl);
