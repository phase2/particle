/**
 * Import libraries
 */
const path = require('path');
const gulp = require('gulp');
const url = require('url');
const _ = require('lodash');

/**
 * Sass-to-JSON
 */
const scssTask = require('./tools/tasks/scss-to-json');
const scssToJsonWatchers = _.uniq(_.map(scssTask.scssToJsonOptions, 'src'));
scssTask.scssToJson(gulp);

/**
 * Twig namespaces work
 */
const namespaceTask = require('./tools/tasks/twig-namespaces');
namespaceTask.twigNamespaces(gulp);

/**
 * Pattern Lab raw compile function
 */
// Config: Path to Pattern Lab installation.
const plPath = path.resolve(__dirname, 'tools/pattern-lab');
// PL compilation function, loaded up with the the PL path
const plCompile = require('./tools/tasks/pl-compile')(plPath);

/**
 * Compile Pattern Lab completely
 */
gulp.task('compile:pl', (cb) => {
  plCompile(cb);
});

/**
 * Webpack config and setup
 */
// URL to visit to see local PL
const localhost = 'http://localhost:8080';
// Import webpack config for PL
const wpconfig = require('./webpack.pl.config');
// Webpack Dev Server config used for local development
const serverconfig = {
  // ie http://localhost:8080/temp
  publicPath: url.resolve(localhost, wpconfig.output.publicPath),
  // ie dist/public
  contentBase: path.resolve(__dirname, 'dist/', 'public/'),
  // Refresh if anything in dist/public changes
  watchContentBase: true,
  // Inject css/js into page without full refresh
  hot: true,
  // Finds default index.html files at folder root
  historyApiFallback: true,
  // Injects all the webpack dev server code right in the page
  inline: true,
  stats: {
    colors: true,
  },
};
// Load up the function that will be used to start a webpack dev server
// This does NOT start the server, that requires the gulp task below.
const webpackdevserver = require('./tools/tasks/webpack-dev-server')(wpconfig, localhost, serverconfig);

/**
 * Starts up the Webpack Dev Server with our config from aove
 */
gulp.task('webpack:server', (cb) => {
  webpackdevserver(cb);
});

/**
 * Watch known PL files and compile to html. twig-namespaces ensures that
 * ./tools/pattern-lab/config.yml & ./theme.info.yml are updated with all
 * pattern namespaces for error-free compiling.
 *
 * @TODO: FIX SASS TO JSON TO ONLY WRITE FILE CHANGED, NOT ALL 5
 */
gulp.task('webpack:watch:pl-source', (cb) => {
  gulp.watch('source/**/*.{twig,json,yml,yaml,md}').on('change', _.debounce(gulp.series([
    'twig-namespaces',
    'compile:pl',
  ]), 300));
  cb();
});

/**
 * Watch config-related scss files to generate json for PL example patterns.
 */
gulp.task('webpack:watch:scss-to-json', (cb) => {
  gulp.watch(scssToJsonWatchers)
    .on('change', gulp.series([
      'scss-to-json',
      'compile:pl',
    ]));
  cb();
});

/**
 * Wire tasks together
 */
gulp.task('webpack:dev', gulp.series([
  'webpack:server',
  'webpack:watch:scss-to-json',
  'webpack:watch:pl-source',
]));
