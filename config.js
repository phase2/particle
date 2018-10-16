/**
 * Shared basic configuration
 */

const path = require('path');

module.exports = {
  PATH_DIST: path.join(__dirname, 'dist/'),
  PATH_SOURCE: path.join(__dirname, 'source/default/'),
  PATH_PATTERNS: path.join(__dirname, 'source/default/_patterns/'),
  PATH_TOOLS: path.join(__dirname, 'tools/'),
  PATH_PL: path.join(__dirname, 'apps/pl/'),
  PATH_DRUPAL: path.join(__dirname, 'apps/drupal/'),
  PATH_GRAV: path.join(__dirname, 'apps/grav/'),
};
