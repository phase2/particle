/* eslint-disable import/no-dynamic-require */

/**
 * Pattern Lab-specific webpack config.
 */

// Library Imports
const path = require('path');
const { DefinePlugin } = require('webpack');

// Plugins
const RunScriptOnFiletypeChange = require('../../tools/webpack/run-script-on-filetype-change');
const particle = require('../../particle');

// Constants: environment
const { NODE_ENV, PARTICLE_PL_HOST = '' } = process.env;
// Constants: root
const { PATH_DIST } = require('../../config');
// Constants: app
const { APP_NAME, APP_PATH, APP_DESIGN_SYSTEM } = require('./config');

const shared = {
  entry: {
    app: [path.resolve(__dirname, 'index.js')],
  },
  output: {
    path: path.resolve(PATH_DIST, `${APP_NAME}/assets`),
    publicPath: `${APP_NAME}/assets`,
  },
  module: {
    rules: [
      // Non-standard assets on the dependency chain
      {
        test: /\.(yml|md)$/,
        loader: 'file-loader',
        options: {
          emitFile: false,
        },
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      BUILD_TARGET: JSON.stringify(APP_NAME),
    }),
  ],
};

const dev = {
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    allowedHosts: ['.docksal', '.vm', '0.0.0.0', 'localhost'],
    contentBase: PATH_DIST, // dev server starts from this folder.
    public: PARTICLE_PL_HOST, // local host name for devServer
    watchContentBase: true, // Refresh devServer when dist/ changes (Pattern Lab)
    watchOptions: {
      ignored: '/(node_modules|pl)/',
    },
    open: false, // Open browser immediately
    openPage: `${APP_NAME}/pl`, // Open browser to the PL landing page so it's very clear where to go
    hot: true, // Inject css/js into page without full refresh
    historyApiFallback: true, // Finds default index.html files at folder root
    inline: true, // Injects all the webpack dev server code right in the page
    // All stats available here: https://webpack.js.org/configuration/stats/
    stats: {
      depth: true,
      entrypoints: true,
      chunkModules: true,
      chunkOrigins: true,
      env: true,
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
    // Recompile PL on any globbed PL file (see glob.js)
    new RunScriptOnFiletypeChange({
      test: /\.(twig|yml|md|json)$/,
      exec: [
        `npx gulp compile --config ${path.resolve(APP_PATH, 'config.js')}`,
      ],
    }),
  ],
};

const prod = {};

module.exports = particle(
  // App
  { shared, dev, prod },
  // Design System
  APP_DESIGN_SYSTEM,
  // Options
  {
    cssMode: NODE_ENV === 'development' ? 'hot' : 'extract',
  }
);
