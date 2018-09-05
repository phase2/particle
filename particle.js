/**
 * Particle config.
 *
 * The shared loaders, plugins, and processing that all our "apps" should use
 */

// Library Imports
const path = require('path');
const { ProgressPlugin, ProvidePlugin } = require('webpack');
const merge = require('webpack-merge');

// Loaders
const autoprefixer = require('autoprefixer');

// Plugins
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
// Plugins:production
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Constants
// NODE_ENV is set within all NPM scripts before running wepback, eg:
//
//  "NODE_ENV='development' webpack-dev-server --config ./apps/pl/webpack.pl.js --hot",
//
// NODE_ENV is either:
// - development
// - production
const { NODE_ENV } = process.env;
const { PATH_PATTERNS, PATH_DIST } = require('./config');
// console.log(PATH_PATTERNS);

// Enable to track down deprecation during development
// process.traceDeprecation = true;

const particleBase = {
  // entry: {}, // See entryPrepend() and particle() below for entry details
  mode: NODE_ENV, // development|production
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: path.resolve(PATH_DIST, 'assets/'),
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 2 },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: () => [autoprefixer()],
            },
          },
          { loader: 'resolve-url-loader' },
          {
            loader: 'sass-loader',
            options: {
              // ALL Sass partials should be provided with non-printing
              // variables, mixins, and functions
              data: '@import "00-protons/variables";',
              // Enable Sass to import other components via, eg:
              // `@import 01-atoms/thing/thing`
              includePaths: [PATH_PATTERNS],
              sourceMap: true,
            },
          },
        ],
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
      {
        test: /\.(woff|woff2|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      // Non-standard assets on the dependency chain
      {
        test: /\.(twig|yml|md)$/,
        loader: 'file-loader',
        options: {
          emitFile: false,
        },
      },
    ],
  },
  plugins: [
    new ProgressPlugin({ profile: false }),
    // Provides "global" vars mapped to an actual dependency. Allows e.g. jQuery
    // plugins to assume that `window.jquery` is available
    new ProvidePlugin({
      // Bootstrap is dependant on jQuery and Popper
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    // Yell at us while writing Sass
    new StyleLintPlugin(),
    // Sprite system options
    new SVGSpritemapPlugin({
      src: path.resolve(PATH_PATTERNS, '01-atoms/svgicon/svg/**/*.svg'),
      styles: path.resolve(
        PATH_PATTERNS,
        '01-atoms/svgicon/scss/_icons-generated.scss'
      ),
      svg4everybody: true,
    }),
  ],
  // Shorthand to import modules, i.e. `import thing from 'atoms/thing'`
  resolve: {
    alias: {
      protons: path.resolve(PATH_PATTERNS, '00-protons/'),
      atoms: path.resolve(PATH_PATTERNS, '01-atoms/'),
      molecules: path.resolve(PATH_PATTERNS, '02-molecules/'),
      organisms: path.resolve(PATH_PATTERNS, '03-organisms/'),
      templates: path.resolve(PATH_PATTERNS, '04-templates/'),
      pages: path.resolve(PATH_PATTERNS, '05-pages/'),
    },
  },
};

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
          use: [{ loader: 'style-loader', options: { sourceMap: true } }],
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
 * For production mode, we will run a big, heavy, full Babel polyfill build
 * right into the bundle
 * @param {string} entry
 * @returns {{entry: {}}}
 */
const entryPrepend = entry => ({
  // See webpack.[app].js for more entry points
  entry:
    NODE_ENV === 'development'
      ? // No special entry points in development
        {}
      : // Full polyfill for production
        { [entry]: ['@babel/polyfill'] },
});
/**
 * Every app using Particle must run its config through this "particle"
 * function to ensure it adheres to Particle standards of dev/prod config.
 *
 * @param {Object} app - The collection of shared, dev, prod webpack config
 * @param {Object} app.shared - Shared webpack config common to dev and prod
 * @param {Object} app.dev - Webpack config unique to prod
 * @param {Object} app.prod - Webpack config unique to prod
 * @param {Object} options - Compile options
 * @param {('hot'|'extract')} options.cssMode - The method of handling CSS output
 * @param {string} options.entry - The main entry point to prepend polyfills
 * @returns {*} - Fully merged and customized webpack config
 */
const particle = (app, options) => {
  const { shared, dev, prod } = app;

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
    // App config shared between dev and prod modes
    shared,
    // App config specific to dev or prod
    NODE_ENV === 'development' ? dev : prod
  );
};

module.exports = {
  // Base webpack config for linters/tests etc
  particleBase,
  // Convert shared, dev, prod config into Particle compatible config
  particle,
};
