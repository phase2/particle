/**
 * Pattern Lab-specific webpack config
 * This is merged over top of webpack.shared.config.js
 */

// Library Imports
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

// Custom Imports
const shared = require('../../webpack.shared.dev.js');

console.log(path.resolve(__dirname, 'dist/'));

// Webpack Entry Points
const pl = {
  mode: 'development',
  entry: {
    'app-pl': [
      path.resolve(__dirname, 'index.js'),
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    contentBase: path.resolve('dist/'), // dev server starts from this folder.
    watchContentBase: true, // Refresh devServer when dist/ changes (Pattern Lab)
    watchOptions: {
      ignored: /(pl|assets)/, // This watches ONLY the root CHANGED.txt file for changes
    },
    open: true, // Open browser immediately
    openPage: 'pl', // Open browser to the PL landing page so it's very clear where to go
    hot: true, // Inject css/js into page without full refresh
    historyApiFallback: true, // Finds default index.html files at folder root
    inline: true, // Injects all the webpack dev server code right in the page
    stats: {
      colors: true, // Colored terminal output.
      hash: true,
      version: true,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: true,
      children: false,
      source: true,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: true,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('pl'),
    }),
  ],
};

module.exports = merge(shared, pl);
