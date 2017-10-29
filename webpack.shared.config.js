const path = require('path');
const webpack = require('webpack');

const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IconfontWebpackPlugin = require('iconfont-webpack-plugin');
const autoprefixer = require('autoprefixer');
const sassExportData = require('@theme-tools/sass-export-data')({
  name: 'export_data',
  path: path.resolve(__dirname, 'source/_data/'),
});

module.exports = {
  // Commented out here since the specifics are different per PL or Drupal
  // entry: { 'entry-name': './path/to/entry.js', },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/temp/',
  },
  devtool: 'source-map',
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
              options: {
                importLoaders: 1,
                sourceMap: true,
                // minimize: {
                //   discardDuplicates: true,
                // }
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
                plugins: loader => [
                  autoprefixer(),
                  new IconfontWebpackPlugin(loader),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                // includePaths: [
                //   path.resolve(__dirname, './'), // @import 'source/_patterns/00-base/base';
                //   path.resolve(__dirname, './source/'), // @import '_patterns/00-base/base';
                //   path.resolve(__dirname, './source/_patterns'), // @import '00-base/base';
                // ],
                functions: sassExportData,
              },
            },
          ],
        })),
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    // Named files instead of chunk IDs for HMR.
    new webpack.NamedModulesPlugin(),
    new StyleLintPlugin(),
  ],
  // resolve: {
  //   alias: {
  //     source: path.resolve(__dirname, './source/'),
  //     base: path.resolve(__dirname, './source/_patterns/00-base/'),
  //     atoms: path.resolve(__dirname, './source/_patterns/01-atoms/'),
  //     molecules: path.resolve(__dirname, './source/_patterns/02-molecules/'),
  //     organisms: path.resolve(__dirname, './source/_patterns/03-organisms/'),
  //     templates: path.resolve(__dirname, './source/_patterns/04-templates/'),
  //     pages: path.resolve(__dirname, './source/_patterns/05-pages/'),
  //   },
  // },
};
