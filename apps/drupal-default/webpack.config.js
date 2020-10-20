/**
 * Drupal-specific webpack config.
 */

const path = require('path');
const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');

// Constants: root
const { ASSETS_ATOMIC_FOLDER } = require('../../particle.root.config');

// Constants: app
const appConfig = require('./particle.app.config');

// Get design system config
const dsWebpackConfig = require('../../source/default/webpack.config');

const { APP_NAME, APP_DESIGN_SYSTEM, APP_DIST, APP_DIST_PUBLIC } = appConfig;

const drupalWebpackConfig = {
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
  externals: {
    jquery: 'jQuery',
  },
  stats: {
    children: false,
    chunks: false,
  },
};

module.exports = merge(dsWebpackConfig, drupalWebpackConfig);
