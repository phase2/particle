/**
 * Shared root configuration
 */

const path = require('path');

module.exports = {
  PATH_APPS: path.join(__dirname, 'apps/'),
  PATH_SOURCE: path.join(__dirname, 'source/'),
  PATH_TOOLS: path.join(__dirname, 'tools/'),
  PATH_DIST: path.join(__dirname, 'dist/'),
  ASSETS_BUNDLE_FOLDER: 'assets/', // PATH_DIST/APP_NAME/ASSETS_BUNDLE_FOLDER
  ASSETS_ATOMIC_FOLDER: 'atomic/', // PATH_DIST/APP_NAME/ASSETS_BUNDLE_FOLDER/ASSETS_ATOMIC_FOLDER
};
