/**
 * Webpack prod config
 *
 * The shared loaders, plugins, and processing that all our "apps" should use
 * for prod.
 */

// Library Imports
const merge = require('webpack-merge');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Custom Imports
const shared = require('./webpack.particle.dev.js');

// Wat: Pop off the style-loader rule so it doesn't explode MiniCssExtractPlugin
shared.module.rules[0].use = shared.module.rules[0].use.slice(1);

const prod = {
  mode: 'production',
  // See webpack.[app].prod.js for entry points
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Pulls out compile css to a standalone file
    new MiniCssExtractPlugin({
      filename: '[name].styles.css',
      chunkFilename: '[id].css',
    }),
  ],
};

// Ensure MiniCssExtractPlugin.loader is the top loader
module.exports = merge.strategy({
  'module.rules': 'prepend',
})(shared, prod);
