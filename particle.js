/**
 * Particle app to merge webpack config.
 */
const path = require('path');

// Library Imports
const merge = require('webpack-merge');

// Plugins:production
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Constants
// NODE_ENV is set within all NPM scripts before running wepback, eg:
//
//  "NODE_ENV='development' webpack-dev-server --config ./apps/pl/webpack.config.js --hot",
//
// NODE_ENV is either:
// - development
// - production
const { NODE_ENV } = process.env;

const particleBase = require('./webpack.particle');

/**
 * CSS modes are import to frontend dev. Particle currently supports hot
 * reloading or full css file extraction.
 */
const cssModes = {
  // 'hot' uses the style-loader plugin which rewrites CSS inline via
  // webpack-dev-server and is purely development-mode ONLY. style-loader
  // CANNOT exists alongside MiniCsExtractPlugin
  hot: {
    // Webpack for hot starts here
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            { loader: 'style-loader', options: { sourceMap: true } },
            { loader: 'vue-style-loader' },
          ],
        },
      ],
    },
  },
  // 'extract' uses MiniCssExtractPlugin.loader to write out actual CSS files to
  // the filesystem. This is useful for production builds, and webpack --watch
  extract: {
    // Webpack for extract starts here
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { publicPath: './' },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].styles.css',
        chunkFilename: '[id].css',
      }),
    ],
  },
};

/**
 * Polyfill ALL modern JS to support for browsers within .browserslistrc
 *
 * @param {string} entry
 * @returns {{entry: {}}}
 */
const entryPrepend = entry => ({
  // See webpack.[app].js for more entry points
  entry: {
    [entry]: ['@babel/polyfill'],
  },
});

/**
 * Every app using Particle must run its config through this "particle"
 * function to ensure it adheres to Particle standards of dev/prod config.
 *
 * @param {Object} appWebpack - The collection of shared, dev, prod webpack config
 * @param {Object} appWebpack.shared - Shared webpack config common to dev and prod
 * @param {Object} appWebpack.dev - Webpack config unique to prod
 * @param {Object} appWebpack.prod - Webpack config unique to prod
 * @param {Object} appConfig - Full app config
 * @param {Object} options - Compile options
 * @param {('hot'|'extract')} options.cssMode - The method of handling CSS output
 * @param {string} [options.entry] - The main entry point to prepend polyfills
 * @returns {*} - Fully merged and customized webpack config
 */
const particle = (appWebpack, appConfig, options) => {
  const { shared, dev, prod } = appWebpack;
  const { APP_DESIGN_SYSTEM } = appConfig;

  // Dynamically pull in design system config. Must be named webpack.config.js
  // eslint-disable-next-line
  const dsWebpack = require(path.resolve(APP_DESIGN_SYSTEM, 'webpack.config'));

  return merge.smartStrategy({
    // Prepend the css style-loader vs MiniExtractTextPlugin
    'module.rules.use': 'prepend',
  })(
    // Particle standard config
    particleBase,
    // What kind of CSS handling, defaults to extract
    options.cssMode ? cssModes[options.cssMode] : 'extract',
    // Prepend loaders to provided entry point, defaults to first entry point
    options.entry
      ? entryPrepend(options.entry)
      : entryPrepend(Object.keys(shared.entry)[0]),
    // Design system-specific config
    dsWebpack,
    // App config shared between dev and prod modes
    shared,
    // App config specific to dev or prod
    NODE_ENV === 'development' ? dev : prod
  );
};

module.exports = particle;
