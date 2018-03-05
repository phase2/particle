/**
 * Drupal-specific webpack config
 * This is merged over top of webpack.shared.config.js
 */

// Library Imports
const merge = require('webpack-merge');

// Custom Imports
const particle = require('../../webpack.particle.prod');
const drupal = require('./webpack.drupal.shared');

const prod = {
  mode: 'production',
};

module.exports = merge(particle, drupal, prod);
