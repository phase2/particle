/**
 * Drupal-specific webpack config.
 * This is merged over top of webpack.particle.dev.js
 */

// Library Imports
const merge = require('webpack-merge');
const WebpackShellPlugin = require('webpack-shell-plugin');

// Custom Imports
// Import shared PROD settings because webpack.particle.prod extracts styles to its own standalone
// CSS files. So drupal dev uses shared prod settings, in dev mode to rapidly build all assets.
const particle = require('../../webpack.particle.prod.js');
const drupal = require('./webpack.drupal.shared');

// Webpack Entry Points
const dev = {
  mode: 'development',
  stats: {
    children: false,
    entrypoints: false,
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: [
        'echo \nWebpack drupal dev build complete! Edit apps/drupal/webpack.drupal.dev.js to run a cache clear script like `drupal cr all` now.',
      ],
      dev: false, // Runs on EVERY rebuild
    }),
  ],
};

module.exports = merge(particle, drupal, dev);
