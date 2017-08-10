const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'j-dash': './source/design-system/j-dash-window.js',
    'pattern-lab': './source/design-system/pattern-lab.js',
    'drupal-theme': './theme-system/drupal-theme.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dest'),
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(
      {
        names: ['design-system', 'j-dash'],
        minChunks: 2,
      },
    ),
    new ExtractTextPlugin({
      filename: '[name].styles.css',
      allChunks: true,
    }),
  ],
};
