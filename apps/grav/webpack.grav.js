/**
 * Grav-specific webpack config common to dev and prod.
 */

const path = require('path');
const webpack = require('webpack');

// Library Imports
const RunScriptAfterEmit = require('../../tools/webpack/run-script-after-emit');

// Constants: environment
const { NODE_ENV } = process.env;
// Constants: root
const { PATH_DIST } = require('../../config');
// Constants: app
const { APP_NAME } = require('./config');

// Design system
const designSystem = require('../../source/default/webpack.default');

// Custom Imports
const particle = require('../../particle');

const shared = {
  entry: {
    [APP_NAME]: [path.resolve(__dirname, 'index.js')],
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
        Edit apps/grav/webpack.grav.js to run run any command you need!
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
  designSystem,
  // Use extract cssMod
  {
    cssMode: 'extract',
  }
);
