/**
 * Drupal-specific webpack config.
 */

const path = require('path');

const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');

// Get design system config
const dsWebpackConfig = require('../../source/default/webpack.config');

const APP_NAME = 'app-drupal';

const drupalWebpackConfig = {
  entry: {
    'drupal-jquery': [path.resolve(__dirname, 'drupal-jquery.js')],
    app: [path.resolve(__dirname, 'index.js')],
  },
  output: {
    // Output all CSS/JS/images/twig to dist/ within drupal theme
    path: path.resolve(__dirname, 'particle_theme/dist'),
  },
  module: {
    rules: [
      {
        test: /\.twig$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: 'atomic/',
          context: path.resolve(__dirname, '../../source/default/'),
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
