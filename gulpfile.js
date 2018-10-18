/* eslint-disable import/no-dynamic-require */

/**
 * Gulp tasks for non-webpack concerns
 * The following tasks do rote work that isn't covered in webpack asset bundling
 */
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const { argv } = require('yargs');

// Constants: environment
const { NODE_ENV = 'production' } = process.env;
// Constants: root
const { PATH_DIST } = require('./config');
// Per-app config, sent in via command line args
const config = require(argv.config);

/**
 * Pattern Lab compile config and closure
 */
// Config: Path to Pattern Lab installation.
const plPath = path.resolve(config.APP_PATH, 'pattern-lab');
// PL compilation function, loaded up with the the PL path
const plCompile = require('./tools/tasks/pl-compile')(plPath);

/**
 * Pattern Lab compile task
 */
gulp.task('compile:pl', plCompile);

/**
 * Relative path conversion for all namespaces in design system relative to app,
 * ie this actual path in a design system:
 *   /Users/username/dev/particle/source/default/_patterns/01-atoms/card
 * converts to relative paths, ie
 *   ../../source/default/_patterns/01-atoms/card
 */
const { namespaces } = require(path.resolve(
  config.APP_DESIGN_SYSTEM,
  'namespaces'
));
// Closure the tool with our config, since gulp task sends in callback by default
const nsWriter = require('./tools/tasks/namespace-writer')(namespaces, config);

/**
 * Namespace generation task
 */
gulp.task('compile:namespaces', nsWriter);

/**
 * When PL is done compiling do stuff here to notify anything that needs to know.
 * Currently just writes to root of dist/ so that Webpack can trigger a reload.
 */
gulp.task('compile:pl:notify:post', cb => {
  // Write to dist/ root a file named index.html, casts Date to text, calls callback
  fs.writeFile(
    path.resolve(PATH_DIST, 'index.html'),
    // prettier-ignore
    `<!doctype html><title>Particle</title><a href="/${config.APP_NAME}/pl">Open Pattern Lab (Last changed: ${+new Date()})</a>`,
    cb
  );
});

/**
 * Simple notification that PL compile is starting
 */
gulp.task('compile:pl:notify:pre', cb => {
  console.info(`\n🚀 Pattern Lab ${NODE_ENV} build running! 🚀\n`);
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
  const env = { env: NODE_ENV };
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
