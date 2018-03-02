/**
 * Pattern Lab-specific webpack config.
 * This is merged over top of webpack.shared.prod.js and
 * outputs compiled bundles to particle/dist/assets.
 */

// Library Imports
const merge = require('webpack-merge');

// Custom Imports
const shared = require('../../webpack.shared.prod.js');
const pl = require('./webpack.pl.shared.js');

module.exports = merge(shared, pl);
