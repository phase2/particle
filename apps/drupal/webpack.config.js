/**
 * Drupal-specific webpack config.
 */

const path = require('path');
const { DefinePlugin } = require('webpack');

// Plugins
const RunScriptAfterEmit = require('../../tools/webpack/run-script-after-emit');
const particle = require('../../particle');

// Constants: environment
const { NODE_ENV } = process.env;
// Constants: root
const { ASSETS_ATOMIC_FOLDER } = require('../../particle.root.config');
// Constants: app
const appConfig = require('./particle.app.config');

const { APP_NAME, APP_DESIGN_SYSTEM, APP_DIST, APP_DIST_PUBLIC } = appConfig;

const shared = {
  entry: {
    'drupal-jquery': [path.resolve(__dirname, 'drupal-jquery.js')],
    app: [path.resolve(__dirname, 'index.js')],
  },
  output: {
    path: APP_DIST,
    publicPath: APP_DIST_PUBLIC,
  },
  module: {
    rules: [
      {
        test: /\.twig$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: ASSETS_ATOMIC_FOLDER,
          context: APP_DESIGN_SYSTEM,
          emit: true,
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
