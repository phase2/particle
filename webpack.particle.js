/**
 * Particle base config.
 *
 * The shared loaders, plugins, and processing that all our "apps" should use.
 * This file is not used directly. See particle.js for usage.
 */

// Library Imports
const { ProgressPlugin, ProvidePlugin } = require('webpack');

// Plugins
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

// Constants: environment
// NODE_ENV is set within all NPM scripts before running Webpack, eg:
//
//  "NODE_ENV='development' webpack-dev-server --config ./apps/pl/webpack.config.js --hot",
//
// NODE_ENV is either:
// - development
// - production
// Defaults to 'production'
const { NODE_ENV = 'production' } = process.env;

// Enable to track down deprecation during development
// process.traceDeprecation = true;

module.exports = {
  mode: NODE_ENV, // development|production
  output: {
    filename: '[name].js',
  },
  devtool: NODE_ENV === 'development' ? 'eval' : 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true, // development only
          // emitWarning: false, // production only
        },
      },
      {
        test: /\.js$/,
        // @babel runtime and core must NOT be transformed by babel
        exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]?[hash]',
            },
          },
        ],
      },
      // Non-standard assets on the dependency chain
      {
        test: /\.twig$/,
        loader: 'file-loader',
        options: {
          emitFile: false,
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: NODE_ENV === 'production',
      }),
    ],
  },
  plugins: [
    // Throw stylelint warnings and errors to console
    new StylelintPlugin(),
    // Provides "global" vars mapped to an actual dependency. Allows e.g. jQuery
    // plugins to assume that `window.jquery` is available
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    // Write CSS to disk
    new MiniCssExtractPlugin(),
    // Only add ProgressPlugin for non-production env.
    ...(NODE_ENV === 'production'
      ? []
      : [new ProgressPlugin({ profile: false })]),
  ],
  // All stats available here: https://webpack.js.org/configuration/stats/
  // stats: {},
};
