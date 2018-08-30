/**
 * Pattern Lab-specific webpack config.
 * This is merged over top of webpack.particle.prod.js and
 * outputs compiled bundles to particle/dist/assets.
 */

// Library Imports
const merge = require('webpack-merge');

// Custom Imports
const particle = require('../../webpack.particle.prod');
const pl = require('./webpack.pl.shared');

const prod = {
  entry: {
    'app-pl': ['@babel/polyfill'],
  },
};

module.exports = merge.strategy({ 'entry.app-pl': 'prepend' })(
  particle,
  pl,
  prod
);
