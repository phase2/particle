/**
 * Gulp tasks for non-webpack concerns
 * The following tasks do rote work that isn't covered in webpack asset bundling
 */
const path = require('path');
const gulp = require('gulp');

const { PATH_PL, PATH_DRUPAL, PATH_GRAV } = require('./config');

/**
 * Pattern Lab raw compile function.
 */
// Config: Path to Pattern Lab installation.
const plPath = path.resolve(__dirname, PATH_PL, 'pattern-lab');
console.log(plPath);
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
 * Webpack config and setup.
 */
// Import webpack config for PL
const wpconfig = require('./webpack.pl.config');
// Webpack Dev Server config used for local development. See all available config options:
// https://webpack.js.org/configuration/dev-server/#devserver
const serverconfig = {
  host: '0.0.0.0',
  port: '8080',
  contentBase: path.resolve(__dirname, 'dist/'), // dev server starts from this folder.
  hot: true, // Inject css/js into page without full refresh
  historyApiFallback: true, // Finds default index.html files at folder root
  inline: true, // Injects all the webpack dev server code right in the page
  stats: {
    colors: true, // Colored terminal output.
    hash: true,
    version: true,
    timings: false,
    assets: true,
    chunks: false,
    modules: false,
    reasons: true,
    children: false,
    source: true,
    errors: true,
    errorDetails: true,
    warnings: true,
    publicPath: true,
  },
};
// Hold a webpack dev server that we can start and reload
const devserver = require('./tools/tasks/webpack-dev-server');

/**
 * Starts up the Webpack Dev Server, requires:
 * 1. webpack config
 * 2. webpack dev server config
 * 3. callback (that gulp provides to every task)
 */
gulp.task('webpack:server', (cb) => {
  devserver.start(wpconfig, serverconfig, cb);
});

/**
 * Refresh an active instance of webpack dev server
 */
gulp.task('webpack:refresh-server', (cb) => {
  devserver.reload(cb);
});

/**
 * Watch known PL files and compile to html. Reload server
 */
gulp.task('webpack:watch:pl-source', (cb) => {
  // @TODO: check if changed file is in path that already exists before namespacing
  gulp.watch('source/**/*.{twig,json,yml,yaml,md}', gulp.series([
    'compile:twig-namespaces',
    'compile:pl',
    'webpack:refresh-server',
  ]));
  cb();
});

/**
 * Standalone compile tasks for non-webpack assets
 */
gulp.task('compile', gulp.series([
  'compile:twig-namespaces',
  'compile:pl',
]));

/**
 * Active server watching via webpack dev server for non-webpack assets.
 */
gulp.task('webpack:dev', gulp.series([
  'webpack:server',
  'webpack:watch:pl-source',
]));

/**
 * Kicking off cold should compile all the non-webpack assets, start webpack:dev
 */
gulp.task('default', gulp.series([
  'compile',
  'webpack:dev',
]));
