const merge = require('webpack-merge');
const shared = require('./webpack.shared.config');

const drupal = {
  entry: {
    'design-system': './source/design-system/design-system.js',
    'drupal-theme': './theme-system/drupal-theme.js',
  },
  externals: {
    jquery: 'jQuery',
    lodash: '_',
  },
};

module.exports = merge(shared, drupal);

// const path = require('path');
// const webpack = require('webpack');
//
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
//
// module.exports = {
//   entry: {
//     'design-system': './source/design-system/design-system.js',
//     'drupal-theme': './theme-system/drupal-theme.js',
//   },
//   output: {
//     filename: '[name].js',
//     path: path.resolve(__dirname, 'dest'),
//   },
//   devServer: {
//     contentBase: './'
//   },
//   externals: {
//     jquery: 'jQuery',
//     lodash: '_',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(sass|scss)$/,
//         loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
//       }
//     ],
//   },
//   plugins: [
//     new webpack.optimize.CommonsChunkPlugin(
//       {
//         name: 'commons',
//         minChunks: 2,
//       },
//     ),
//     new ExtractTextPlugin({
//       filename: '[name].styles.css',
//       allChunks: true,
//     }),
//   ],
// };
