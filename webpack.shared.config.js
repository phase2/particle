const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // Commented out here since the specifics are different per PL or Drupal
  // entry: { 'entry-name': './path/to/entry.js', },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dest'),
    publicPath: 'temp/',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'pattern-lab', 'public'),
  },
  // target: 'node',
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: "babel-loader",
      //   include: path.resolve(__dirname, 'source'),
      // },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, 'source'),
        use: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      }
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(
      {
        name: 'commons',
        minChunks: 2,
      },
    ),
    new ExtractTextPlugin({
      filename: '[name].styles.css',
      allChunks: true,
    }),
  ],
};
