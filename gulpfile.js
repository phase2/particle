/**
 * Gulp tasks for non-webpack concerns
 * The following tasks do rote work that isn't covered in webpack asset bundling
 */
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const _ = require('lodash');
const yaml = require('js-yaml');
const { argv } = require('yargs');

const { PATH_DIST } = require('./config');

const config = require(argv.config); // eslint-disable-line import/no-dynamic-require

/**
 * Pattern Lab raw compile function.
 */
// Config: Path to Pattern Lab installation.
const plPath = path.resolve(config.APP_PATH, 'pattern-lab');
// PL compilation function, loaded up with the the PL path
const plCompile = require('./tools/tasks/pl-compile')(plPath);

/**
 * Compile Pattern Lab completely.
 */
gulp.task('compile:pl', plCompile);

/**
 * Gulp needs to work in relative paths, NOT absolute like we've configured in
 * config.js. So convert all absolute config paths, ie
 *   /Users/username/dev/particle/apps/drupal/
 * to relative paths, ie
 *   apps/drupal/
 */
// eslint-disable-next-line import/no-dynamic-require
const { namespaces } = require(path.resolve(
  config.APP_DESIGN_SYSTEM,
  'namespaces'
));

gulp.task('compile:namespaces', cb => {
  // Create namespace paths in the correct relative path each app needs
  const relNamespaces = Object.keys(namespaces).reduce((acc, cat) => {
    acc[cat] = {
      paths: [].concat(
        ...namespaces[cat].paths.map(atomicPath =>
          // Each app provides its own transform function :)
          config.namespaces.transform(atomicPath)
        )
      ),
    };
    return acc;
  }, {});

  // Read and then write app config
  fs.readFile(config.namespaces.config, 'utf8', (readErr, data) => {
    if (readErr) {
      console.error(readErr);
      return cb();
    }
    // Now load contents
    const appConfigContents = yaml.safeLoad(data);
    // Use lodash and key shorthand to set key/values
    _.set(appConfigContents, config.namespaces.atKey, relNamespaces);
    // Write to fs
    return fs.writeFile(
      config.namespaces.config,
      yaml.safeDump(appConfigContents),
      'utf8',
      writeErr => {
        if (writeErr) {
          console.error(writeErr);
          return cb();
        }
        return cb();
      }
    );
  });
});

/**
 * When PL is done compiling do stuff here to notify anything that needs to know. Currently it just
 * writes a file to the root of dist/ so that Webpack can trigger a reload.
 */
gulp.task('compile:pl:notify:post', cb => {
  // Write to dist/ root a file named index.html, casts Date to text, calls callback
  fs.writeFile(
    path.resolve(PATH_DIST, 'index.html'),
    `<!doctype html><title>Particle</title><a href="/pl">Open Pattern Lab (Last changed: ${+new Date()})</a>`,
    cb
  );
});

/**
 * Simple notification that PL compile is starting
 */
gulp.task('compile:pl:notify:pre', cb => {
  console.info(`\n🚀 Pattern Lab ${process.env.NODE_ENV} build running! 🚀\n`);
  cb();
});

/**
 * Generate data json PL uses to determine which mode: 'development' or 'production.'
 * Defaults to 'production' if NODE_ENV is not set.
 */
gulp.task('compile:pl:env', cb => {
  // Default of 'production' if running this task standalone. Run like so to set NODE_ENV:
  //
  //   NODE_ENV='development' npx gulp compile:pl:env
  //
  const env = {
    env: process.env.NODE_ENV ? process.env.NODE_ENV : 'production',
  };
  fs.writeFile(
    path.resolve(config.APP_DESIGN_SYSTEM, '_data/', 'env.json'),
    JSON.stringify(env),
    cb
  );
});

/**
 * Standalone compile tasks for non-webpack assets. Run repeatedly.
 * Note: 'compile:pl:env' must have been run at least once to guarantee source/_data/env.json exists
 */
gulp.task(
  'compile',
  // prettier-ignore
  gulp.series([
    'compile:pl:notify:pre',
    'compile:namespaces',
    'compile:pl',
    'compile:pl:notify:post',
  ])
);

/**
 * First-time PL build. Run on startup.
 */
gulp.task(
  'compile:startup',
  // prettier-ignore
  gulp.series([
    'compile:pl:env',
    'compile',
  ])
);

/**
 * Kicking off cold should compile all Pattern Lab assets
 */
gulp.task('default', gulp.series(['compile:startup']));
