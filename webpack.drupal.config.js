const webpack = require('webpack');
const merge = require('webpack-merge');
const shared = require('./webpack.shared.config');
const webpack = require('webpack');

const drupal = {
  entry: {
    'drupal-theme': [
      './drupal/drupal-theme.js',
    ],
  },
  externals: {
    jquery: 'jQuery',
    lodash: '_',
  },
  plugins: [
    // short-circuits all Vue.js warning code
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      BUILD_TARGET: JSON.stringify('drupal'),
    }),
    // minify with dead-code elimination
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
};

module.exports = merge(shared, drupal);
