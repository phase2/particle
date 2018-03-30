/**
 * Gulp tasks for non-webpack concerns
 * The following tasks do rote work that isn't covered in webpack asset bundling
 */
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');

const {
  PATH_PL,
  PATH_DRUPAL,
  PATH_GRAV,
  PATH_SOURCE,
  PATH_DIST,
} = require('./config');

/**
 * Pattern Lab raw compile function.
 */
// Config: Path to Pattern Lab installation.
const plPath = path.resolve(__dirname, PATH_PL, 'pattern-lab');
// PL compilation function, loaded up with the the PL path
const plCompile = require('./tools/tasks/pl-compile')(plPath);

/**
 * Compile Pattern Lab completely.
 */
gulp.task('compile:pl', plCompile);

/**
 * Gulp namespace, ensures that ./apps/pl/pattern-lab/config.yml & ./apps/drupal/themename.info.yml
 * are updated with all pattern namespaces for error-free compiling.
 */
const twigNamespaces = require('./tools/tasks/gulp-twig-namespaces');

gulp.task('compile:twig-namespaces', () => gulp
  .src('./source/_patterns/**/*.twig')
  .pipe(twigNamespaces({
    // Which files to read and overwrite with namespace info
    outputs: [
      {
        // Note: PL will NOT compile unless the namespaces are explicitly declared
        configFile: path.join(PATH_PL, 'pattern-lab/config/config.yml'),
        atKey: 'plugins.twigNamespaces.namespaces',
        pathRelativeToDir: path.join(PATH_PL, 'pattern-lab/'),
      },
      {
        // The component-libraries module wants to know about our namespaces
        configFile: path.join(PATH_DRUPAL, 'particle.info.yml'),
        atKey: 'component-libraries',
        pathRelativeToDir: path.join(PATH_DRUPAL, ''),
      },
      {
        // The twig-namespaces plugin wants to know about our namespaces
        configFile: path.join(PATH_GRAV, 'twig-namespaces.yaml'),
        atKey: 'generated-namespaces',
        pathRelativeToDir: path.join(PATH_GRAV, ''),
      },
    ],
    // What are the top-level namespace paths, and which sub paths should we ignore?
    sets: {
      protons: {
        root: 'source/_patterns/00-protons',
        ignore: '/demo',
      },
      atoms: {
        root: 'source/_patterns/01-atoms',
        ignore: '/demo',
      },
      molecules: {
        root: 'source/_patterns/02-molecules',
        ignore: '/demo',
      },
      organisms: {
        root: 'source/_patterns/03-organisms',
        ignore: '/demo',
      },
      templates: {
        root: 'source/_patterns/04-templates',
        ignore: '/demo',
      },
      pages: {
        root: 'source/_patterns/05-pages',
        ignore: '/demo',
      },
    },
  }))
  .pipe(gulp.dest('./')));

/**
 * When PL is done compiling do stuff here to notify anything that needs to know. Currently it just
 * writes a file to the root of dist/ so that Webpack can trigger a reload.
 */
gulp.task('compile:pl:notify', (cb) => {
  // Write to dist/ root a file named CHANGED.txt, casts Date to text, calls callback
  fs.writeFile(path.resolve(__dirname, PATH_DIST, 'CHANGED.txt'), +new Date(), cb);
});

/**
 * Generate data json PL uses to determine which mode: 'development' or 'production.' Defaults to
 * 'production' if NODE_ENV is not set.
 */
gulp.task('compile:pl:env', (cb) => {
  const env = { env: process.env.NODE_ENV ? process.env.NODE_ENV : 'production' };
  fs.writeFile(path.resolve(__dirname, PATH_SOURCE, '_data/', 'env.json'), JSON.stringify(env), cb);
});

/**
 * Standalone compile tasks for non-webpack assets
 */
gulp.task('compile', gulp.series([
  'compile:pl:env',
  'compile:twig-namespaces',
  'compile:pl',
  'compile:pl:notify',
]));

/**
 * Kicking off cold should compile all Pattern Lab assets
 */
gulp.task('default', gulp.series([
  'compile',
]));
