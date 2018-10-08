/**
 * Particle base config.
 *
 * The shared loaders, plugins, and processing that all our "apps" should use.
 * This file is not used directly. See particle.js for usage.
 */

// Library Imports
const path = require('path');
const { ProgressPlugin, ProvidePlugin } = require('webpack');

// Loaders
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

// Plugins
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// Constants
// NODE_ENV is set within all NPM scripts before running Webpack, eg:
//
//  "NODE_ENV='development' webpack-dev-server --config ./apps/pl/webpack.pl.js --hot",
//
// NODE_ENV is either:
// - development
// - production
const { NODE_ENV } = process.env;
const { PATH_PATTERNS, PATH_DIST } = require('./config');

// Enable to track down deprecation during development
// process.traceDeprecation = true;

module.exports = {
  // entry: {}, // See entryPrepend() and particle() below for entry details
  mode: NODE_ENV, // development|production
  output: {
    filename: '[name].js',
    path: path.resolve(PATH_DIST, 'assets/'),
    publicPath: '/assets/',
  },
  devtool: NODE_ENV === 'development' ? 'eval' : 'source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: () =>
                NODE_ENV === 'development'
                  ? [postcssPresetEnv()] // Light processing for dev
                  : [postcssPresetEnv(), cssnano()], // Heavy processing for prod
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // ALL Sass partials should be provided with non-printing
              // variables, mixins, and functions
              data: '@import "00-protons/variables";',
              // Enable Sass to import other components via, eg:
              // `@import 01-atoms/thing/thing`
              includePaths: [PATH_PATTERNS],
            },
          },
        ],
      },
      {
        test: /\.(js|vue)$/,
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
        test: /\.twig$/,
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
    new SVGSpritemapPlugin(
      path.resolve(PATH_PATTERNS, '01-atoms/svgicon/svg/**/*.svg'),
      {
        styles: {
          filename: path.resolve(
            PATH_PATTERNS,
            '01-atoms/svgicon/scss/_icons-generated.scss'
          ),
          variables: {
            sizes: 'svgicon-sizes', // Prevent collision with Bootstrap $sizes
            variables: 'svgicon-variables',
          },
        },
        output: {
          svg4everybody: true,
          svgo: true,
        },
      }
    ),
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      // Since we operate in a world where random Vue templates might have to
      // be output via twig, we need the Vue build that includes the whole
      // template compiling engine. If we are on a build that will NEVER read
      // HTML from the DOM and use it as a template, then remove this line.
      vue$: 'vue/dist/vue.esm.js',
      // Shorthand to import modules, i.e. `import thing from 'atoms/thing';`
      // @TODO: We should probably prefix these with a symbol.
      protons: path.resolve(PATH_PATTERNS, '00-protons/'),
      atoms: path.resolve(PATH_PATTERNS, '01-atoms/'),
      molecules: path.resolve(PATH_PATTERNS, '02-molecules/'),
      organisms: path.resolve(PATH_PATTERNS, '03-organisms/'),
      templates: path.resolve(PATH_PATTERNS, '04-templates/'),
      pages: path.resolve(PATH_PATTERNS, '05-pages/'),
    },
  },
};
