const path = require('path');
const webpack = require('webpack');

const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  // Commented out here since the specifics are different per PL or Drupal
  // entry: { 'entry-name': './path/to/entry.js', },
  entry: {},
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/temp/',
    // hotUpdateChunkFilename: 'hot/hot-update.js',
    // hotUpdateMainFilename: 'hot/hot-update.json'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist', 'public'),
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        include: [
          path.resolve(__dirname, 'source'),
          path.resolve(__dirname, 'drupal'),
        ],
        // use: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [ autoprefixer() ]
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })),
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      minChunks: 2,
    }),
    new ExtractTextPlugin({
      filename: '[name].styles.css',
      allChunks: true,
    }),
    // Named files instead of chunk IDs for HMR.
    new webpack.NamedModulesPlugin(),
    new StyleLintPlugin(),
  ],
};
