/**
 * Grav-specific webpack config common to dev and prod.
 */

const path = require('path');
const webpack = require('webpack');

// Library Imports
const RunScriptAfterEmit = require('../../tools/webpack/run-script-after-emit');
const particle = require('../../particle');

// Constants: environment
const { NODE_ENV } = process.env;
// Constants: root
const { PATH_DIST } = require('../../config');
// Constants: app
const { APP_NAME, APP_DESIGN_SYSTEM } = require('./config');

const shared = {
  entry: {
    app: [path.resolve(__dirname, 'index.js')],
  },
  output: {
    path: path.resolve(PATH_DIST, `${APP_NAME}/assets`),
    publicPath: `${APP_NAME}/assets`,
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify(APP_NAME),
    }),
  ],
};

const dev = {
  stats: {
    children: false,
    entrypoints: false,
  },
  plugins: [
    new RunScriptAfterEmit({
      exec: [
        `echo \n🚀 Webpack Grav ${NODE_ENV} build complete! 
        Edit apps/grav/webpack.config.js to run run any command you need!
        Great for using tasks to re-generate twig-namespaces! 🚀\n`,
      ],
    }),
  ],
};

const prod = {};

module.exports = particle(
  // app
  { shared, dev, prod },
  // Default design system
  APP_DESIGN_SYSTEM,
  // Use extract cssMod
  {
    cssMode: 'extract',
  }
);
