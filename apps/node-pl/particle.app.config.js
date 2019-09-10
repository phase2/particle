/**
 * Particle app conventions
 */

const path = require('path');

const {
  PATH_DIST,
  ASSETS_BUNDLE_FOLDER,
} = require('../../particle.root.config');

// Used as folder name within PATH_DIST, does not have to be folder name of app
const APP_NAME = 'app-node-pl';
// Full path to app
const APP_PATH = path.resolve(__dirname);
// Full path to design system used in this app
const APP_DESIGN_SYSTEM = path.resolve(__dirname, '../../source/default');
// Where should this app compile to, e.g. dist/app-drupal/assets/
const APP_DIST = path.join(PATH_DIST, APP_NAME, ASSETS_BUNDLE_FOLDER);
// Base path for all assets
const APP_DIST_PUBLIC = `/${path.join(APP_NAME, ASSETS_BUNDLE_FOLDER)}`;

module.exports = {
  APP_NAME,
  APP_PATH,
  APP_DESIGN_SYSTEM,
  APP_DIST,
  APP_DIST_PUBLIC,
};
