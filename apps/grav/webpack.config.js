/**
 * Grav-specific webpack config common to dev and prod.
 */

const path = require('path');
const webpack = require('webpack');

// Library Imports
const CopyWebpackPlugin = require('copy-webpack-plugin');
const RunScriptAfterEmit = require('../../tools/webpack/run-script-after-emit');
const particle = require('../../particle');

// Constants: environment
const { NODE_ENV, PWD } = process.env;
// Constants: root
const { ASSETS_ATOMIC_FOLDER } = require('../../config');
// Constants: app
const appConfig = require('./config');

const { APP_NAME, APP_DESIGN_SYSTEM, APP_DIST, APP_DIST_PUBLIC } = appConfig;

const shared = {
  entry: {
    app: [path.resolve(__dirname, 'index.js')],
  },
  output: {
    path: APP_DIST,
    publicPath: APP_DIST_PUBLIC,
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify(APP_NAME),
    }),
    // Copy all design system twig to `dist/${APP_NAME}/assets/atomic/` so source/
    // doesn't have to deploy to prod
    new CopyWebpackPlugin(
      [
        {
          from: '**/*.twig',
          to: ASSETS_ATOMIC_FOLDER,
          context: path.relative(PWD, APP_DESIGN_SYSTEM),
        },
      ],
      {
        ignore: ['**/{demo,_meta}/**/*'],
      }
    ),
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
  // app: webpack
  { shared, dev, prod },
  // app: config
  appConfig,
  // Use extract cssMod
  {
    cssMode: 'extract',
  }
);
