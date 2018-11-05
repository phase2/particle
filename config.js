/**
 * Shared root configuration
 */

const path = require('path');

module.exports = {
  PATH_APPS: path.join(__dirname, 'apps/'),
  PATH_SOURCE: path.join(__dirname, 'source/'),
  PATH_DIST: path.join(__dirname, 'dist/'),
  PATH_TOOLS: path.join(__dirname, 'tools/'),
};
