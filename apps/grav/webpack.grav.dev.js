/**
 * Grav-specific webpack config.
 * This is merged over top of webpack.particle.prod.js
 *
 * Import shared PROD settings because webpack.particle.prod extracts styles to its own standalone
 * CSS files. So grav dev uses shared PROD settings, in DEV MODE to rapidly build all assets.
 */

// Library Imports
const merge = require('webpack-merge');
const WebpackShellPlugin = require('webpack-shell-plugin');

// Custom Imports
const particle = require('../../webpack.particle.prod');
const grav = require('./webpack.grav.shared');

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
        'echo \nWebpack grav dev build complete! Edit apps/grav/webpack.grav.dev.js to run run any command you need! Great for using tasks to re-generate twig-namespaces!',
      ],
      dev: false, // Runs on EVERY rebuild
    }),
  ],
};

module.exports = merge(particle, grav, dev);
