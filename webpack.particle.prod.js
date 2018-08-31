/**
 * Webpack shared config
 * The shared loaders, plugins, and processing that all our "apps" should use for prod.
 */

// Library Imports
const path = require('path');
const merge = require('webpack-merge');

const sassExportData = require('@theme-tools/sass-export-data')({
  name: 'export_data',
  path: path.resolve(__dirname, 'source/_data/'),
});

// Plugins
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Custom Imports
const shared = require('./webpack.particle.dev.js');

const prod = {
  mode: 'production',
  // See webpack.[app].prod.js for entry points
  stats: 'minimal',
  module: {
    rules: [
      {
        // Wrapped with ExtractText to create a standalone file.
        test: /\.(css|sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: './',
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
                includePaths: [path.resolve(__dirname, './source/_patterns')],
                // Used to generate JSON about variables like colors, fonts
                functions: sassExportData,
                sourceMap: true,
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    // Pulls out compile css to a standalone file
    new ExtractTextPlugin({
      filename: '[name].styles.css',
      allChunks: true,
    }),
  ],
};

module.exports = merge.smart(shared, prod);
