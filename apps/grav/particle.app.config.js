/**
 * Particle app conventions
 */

const path = require('path');

const { PWD } = process.env;
const {
  PATH_DIST,
  ASSETS_BUNDLE_FOLDER,
  ASSETS_ATOMIC_FOLDER,
} = require('../../particle.root.config');

// Used as folder name within PATH_DIST, does not have to be folder name of app
const APP_NAME = 'app-grav';
// Full path to app
const APP_PATH = path.resolve(__dirname);
// Full path to design system used in this app
const APP_DESIGN_SYSTEM = path.resolve(__dirname, '../../source/default');
// Where should this app compile to, e.g. dist/app-drupal/assets/
const APP_DIST = path.join(PATH_DIST, APP_NAME, ASSETS_BUNDLE_FOLDER);
// Base path for all assets
const APP_DIST_PUBLIC = path.join(APP_NAME, ASSETS_BUNDLE_FOLDER);

// Namespace formatting, required by the namespaces module
const namespaces = {
  // The yml file that will be modified
  config: path.resolve(__dirname, 'twig-namespaces.yaml'),
  // The key within the file where the namespaces will be written
  atKey: 'namespaces',
  // The namespaces module runs a transform function, providing to it the path
  // to the pattern within source/
  transform: folderPath => {
    const gravPre = 'user/themes/particle';
    // We have to get from a path like:
    //   /Users/username/dev/p2/p2/particle/source/default/_patterns/01-atoms/badge
    // To:
    //   user/themes/particle/dist/app-grav/assets/atomic/_patterns/01-atoms/badge

    // e.g. default/_patterns/01-atoms/badge
    const appDistPath = path.relative(PWD, APP_DIST);
    // e.g. _patterns/01-atoms/badge
    const patternPath = path.relative(APP_DESIGN_SYSTEM, folderPath);
    // e.g. user/themes/particle/dist/app-grav/assets/atomic/_patterns/01-atoms/badge
    return path.join(gravPre, appDistPath, ASSETS_ATOMIC_FOLDER, patternPath);
  },
};

module.exports = {
  APP_NAME,
  APP_PATH,
  APP_DESIGN_SYSTEM,
  APP_DIST,
  APP_DIST_PUBLIC,
  namespaces,
};
