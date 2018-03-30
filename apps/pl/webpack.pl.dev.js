/**
 * Pattern Lab-specific webpack config.
 * This is merged over top of webpack.particle.dev.js and uses
 * a hot-reloading server that does not generate assets inside dist/.
 */

// Library Imports
const path = require('path');
const merge = require('webpack-merge');

const RunScriptOnFiletypeChange = require('../../tools/webpack/run-script-on-filetype-change');

// Custom Imports
const particle = require('../../webpack.particle.dev');
const pl = require('./webpack.pl.shared');


// Webpack Entry Points
const dev = {
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    contentBase: path.resolve('dist/'), // dev server starts from this folder.
    watchContentBase: true, // Refresh devServer when dist/ changes (Pattern Lab)
    watchOptions: {
      ignored: '/(node_modules|dist/pl)/',
    },
    open: true, // Open browser immediately
    openPage: 'pl', // Open browser to the PL landing page so it's very clear where to go
    hot: true, // Inject css/js into page without full refresh
    historyApiFallback: true, // Finds default index.html files at folder root
    inline: true, // Injects all the webpack dev server code right in the page
    stats: {
      colors: true,
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
    new RunScriptOnFiletypeChange({
      test: /\.(twig|yml|yaml|md)$/,
      exec: 'echo "\n🚀 PATTERN LAB REBUILD RUNNING 🚀" && npm run dev:pl:gulp',
    }),
  ],
};

module.exports = merge(particle, pl, dev);
