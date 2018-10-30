/**
 * Drupal-specific webpack config.
 */

const path = require('path');
const { DefinePlugin } = require('webpack');

// Plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');
const RunScriptAfterEmit = require('../../tools/webpack/run-script-after-emit');
const particle = require('../../particle');

// Constants: environment
const { NODE_ENV } = process.env;
// Constants: root
const {
  PATH_DIST,
  ASSETS_BUNDLE_FOLDER,
  ASSETS_ATOMIC_FOLDER,
} = require('../../config');
// Constants: app
const appConfig = require('./config');

const { APP_NAME, APP_DESIGN_SYSTEM } = appConfig;

const shared = {
  entry: {
    'drupal-jquery': [path.resolve(__dirname, 'drupal-jquery.js')],
    app: [path.resolve(__dirname, 'index.js')],
  },
  output: {
    path: path.resolve(PATH_DIST, APP_NAME, ASSETS_BUNDLE_FOLDER),
    publicPath: `${APP_NAME}/${ASSETS_BUNDLE_FOLDER}`,
  },
  plugins: [
    new DefinePlugin({
      BUILD_TARGET: JSON.stringify(APP_NAME),
    }),
    // Copy all design system twig to `dist/${APP_NAME}/assets/atomic/` so source/
    // doesn't have to deploy to prod
    new CopyWebpackPlugin(
      [
        {
          from: '**/*.twig',
          to: ASSETS_ATOMIC_FOLDER,
          context: path.relative(process.env.PWD, APP_DESIGN_SYSTEM),
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
        // prettier-ignore
        `echo \n🚀 Webpack Drupal ${NODE_ENV} build complete! 
        Edit apps/drupal/webpack.config.js to replace this line with 
        'drupal cr all' now. 🚀\n`,
      ],
    }),
  ],
};

const prod = {
  stats: {
    children: false,
    entrypoints: false,
  },
};

module.exports = particle(
  // app: webpack
  { shared, dev, prod },
  // app: config
  appConfig,
  // Use extract css
  {
    cssMode: 'extract',
    entry: 'app', // Called out specifically because 2 entry points
  }
);
