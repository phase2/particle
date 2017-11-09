const merge = require('webpack-merge');
const shared = require('./webpack.shared.config');
const webpack = require('webpack');

const drupal = {
  entry: {
    'app-drupal': [
      './app-drupal/index.js',
    ],
  },
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
