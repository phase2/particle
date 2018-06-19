/**
 * Drupal-specific webpack config.
 * This is merged over top of webpack.particle.prod.js
 *
 * Import shared PROD settings because webpack.particle.prod extracts styles to its own standalone
 * CSS files. So drupal dev uses shared PROD settings, in DEV MODE to rapidly build all assets.
 */

// Library Imports
const merge = require('webpack-merge');
const RunScriptAfterEmit = require('../../tools/webpack/run-script-after-emit');

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
    new RunScriptAfterEmit({
      exec: [
        // prettier-ignore
        `echo \n🚀 Webpack Drupal ${process.env.NODE_ENV} build complete! 
        Edit apps/drupal/webpack.drupal.dev.js to replace this line with 
        'drupal cr all' now. 🚀\n`,
      ],
    }),
  ],
};

module.exports = merge(particle, drupal, dev);
