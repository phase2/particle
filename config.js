/**
 * Shared basic configuration
 */

const path = require('path');

module.exports = {
  PATH_PL: path.resolve(__dirname, 'apps/pl/'),
  PATH_DRUPAL: path.resolve(__dirname, 'apps/drupal/'),
  PATH_GRAV: path.resolve(__dirname, 'apps/grav/'),
  PATH_DIST: path.resolve(__dirname, 'dist/'),
  PATH_SOURCE: path.resolve(__dirname, 'source/'),
  PATH_PATTERNS: path.resolve(__dirname, 'source/_patterns/'),
};
