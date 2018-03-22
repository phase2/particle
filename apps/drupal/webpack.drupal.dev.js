/**
 * Drupal-specific webpack config.
 * This is merged over top of webpack.particle.prod.js
 *
 * Import shared PROD settings because webpack.particle.prod extracts styles to its own standalone
 * CSS files. So drupal dev uses shared PROD settings, in DEV MODE to rapidly build all assets.
 */

// Library Imports
const merge = require('webpack-merge');
const WebpackShellPlugin = require('webpack-shell-plugin');

// Custom Imports
const particle = require('../../webpack.particle.prod');
const drupal = require('./webpack.drupal.shared');

// Webpack Entry Points
const dev = {
  mode: 'development', // Since we import PROD config, must set this to dev
  stats: {
    children: false,
    entrypoints: false,
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: [
        'echo \nWebpack drupal dev build complete! Edit apps/drupal/webpack.drupal.dev.js to replace this line with `drupal cr all` now.',
      ],
      dev: false, // Runs on EVERY rebuild
    }),
  ],
};

module.exports = merge(particle, drupal, dev);
