/**
 * Import libraries
 */
const path = require('path');
const gulp = require('gulp');
const url = require('url');
const _ = require('lodash');

/**
 * Twig-namespaces ensures that ./tools/pattern-lab/config.yml & ./theme.info.yml
 * are updated with all pattern namespaces for error-free compiling.
 */
const namespaceTask = require('./tools/tasks/twig-namespaces');

namespaceTask.twigNamespaces(gulp);

/**
 * Pattern Lab raw compile function.
 */
// Config: Path to Pattern Lab installation.
const plPath = path.resolve(__dirname, 'tools/pattern-lab');
// PL compilation function, loaded up with the the PL path
const plCompile = require('./tools/tasks/pl-compile')(plPath);

/**
 * Compile Pattern Lab completely.
 */
gulp.task('compile:pl', plCompile);

/**
 * Webpack config and setup.
 */
// URL to visit to see local PL
const localhost = 'http://localhost:8080';
// Import webpack config for PL
const wpconfig = require('./webpack.pl.config');
// Webpack Dev Server config used for local development.
// See all available config options:
// https://webpack.js.org/configuration/dev-server/#devserver
const serverconfig = {
  publicPath: url.resolve(localhost, wpconfig.output.publicPath), // ie http://localhost:8080/temp
  contentBase: path.resolve(__dirname, 'dist/', 'public/'), // ie dist/public
  watchContentBase: true, // Refresh if anything in dist/public changes
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
    reasons: false,
    children: false,
    source: true,
    errors: true,
    errorDetails: true,
    warnings: true,
    publicPath: true
  },
};
// Load up the function that will be used to start a webpack dev server
// This does NOT start the server, that requires the gulp task below.
const webpackdevserver = require('./tools/tasks/webpack-dev-server')(wpconfig, localhost, serverconfig);

/**
 * Starts up the Webpack Dev Server with our config from aove
 */
gulp.task('webpack:server', webpackdevserver);

/**
 * Sass-to-JSON
 */
const scssConfigs = [
  {
    src: './source/_patterns/00-base/05-colors/_colors.scss',
    dest: './source/_patterns/00-base/05-colors/colors.json',
    lineStartsWith: '$c-',
  },
  {
    src: './source/_patterns/00-base/15-typography/fonts/_fonts.scss',
    dest: './source/_patterns/00-base/15-typography/fonts/font-sizes.json',
    lineStartsWith: '$fs--',
  },
  {
    src: './source/_patterns/00-base/15-typography/fonts/_fonts.scss',
    dest: './source/_patterns/00-base/15-typography/fonts/font-families.json',
    lineStartsWith: '$ff--',
  },
  {
    src: './source/_patterns/00-base/breakpoints/_breakpoints.scss',
    dest: './source/_patterns/00-base/breakpoints/breakpoints.json',
    lineStartsWith: '$bp--',
  },
  {
    src: './source/_patterns/00-base/10-spacing/_spacing.scss',
    dest: './source/_patterns/00-base/10-spacing/spacing.json',
    lineStartsWith: '$spacing--',
  },
];
const scssToJson = require('./tools/tasks/scss-to-json')(scssConfigs);
// This line uniquely sets the sass files to be watched, as indicated by the 'src' key.
// Uniquely, because _fonts.scss is watched for two different variable strings.
const scssToJsonWatchers = _.uniq(_.map(scssConfigs, 'src'));

/**
 * Watch config-related scss files to generate json for PL example patterns.
 */
gulp.task('webpack:watch:scss-to-json', (cb) => {
  gulp.watch(scssToJsonWatchers).on('change', scssPath => (scssToJson(scssPath)));
  cb();
});

/**
 * Manual compile all scss-to-json configs.
 */
gulp.task('compile:all-scss-to-json', (cb) => {
  // Loop through each config and compile it
  _.forEach(scssConfigs, (item) => { scssToJson(item.src); });
  cb();
});

/**
 * Watch known PL files and compile to html.
 */
gulp.task('webpack:watch:pl-source', (cb) => {
  gulp.watch('source/**/*.{twig,json,yml,yaml,md}', gulp.series([
    'twig-namespaces',
    'compile:pl',
  ]));
  cb();
});

/**
 * Standalone compile tasks for non-webpack assets
 */
gulp.task('compile', gulp.series([
  'compile:all-scss-to-json',
  'twig-namespaces',
  'compile:pl',
]));

/**
 * Active server watching via webpack dev server for non-webpack assets.
 */
gulp.task('webpack:dev', gulp.series([
  'webpack:server',
  'webpack:watch:scss-to-json',
  'webpack:watch:pl-source',
]));

/**
 * Kicking off cold should compile all the non-webpack assets, start webpack:dev
 */
gulp.task('default', gulp.series([
  'compile',
  'webpack:dev',
]));
