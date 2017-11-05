/**
 * Import libraries
 */
const path = require('path');
const gulp = require('gulp');

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
 * Gulp namespace, ensures that ./tools/pattern-lab/config.yml & ./theme.info.yml
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
        configFile: './tools/pattern-lab/config/config.yml',
        atKey: 'plugins.twigNamespaces.namespaces',
        pathRelativeToDir: './tools/pattern-lab',
      },
      {
        // The component-libraries module wants to know about our namespaces
        configFile: './patternlab.info.yml',
        atKey: 'component-libraries',
        pathRelativeToDir: './',
      },
    ],
    // What are the top-level namespace paths, and which sub paths should we ignore?
    sets: {
      base: {
        root: 'source/_patterns/00-base',
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
 * Gulp sass-to-json, pull off the vars we want to json
 */
// const sass2json = require('./tools/tasks/gulp-sass2json');
//
// gulp.task('compile:scss-to-json', () => gulp
//   .src('./source/_patterns/00-base/**/*.scss')
//   .pipe(sass2json('baseScssVars.json', {
//     sassVars: [
//       { lineStartsWith: '$c-' },
//       { lineStartsWith: '$fs--' },
//       { lineStartsWith: '$ff--' },
//       { lineStartsWith: '$bp--' },
//       { lineStartsWith: '$spacing--' },
//     ],
//   }))
//   .pipe(gulp.dest('./source/_data/')));

/**
 * Watch config-related scss files to generate json for PL example patterns.
 */
// gulp.task('webpack:watch:scss-to-json', (cb) => {
//   gulp.watch('./source/_patterns/00-base/**/*.scss', gulp.series('compile:scss-to-json'));
//   cb();
// });

/**
 * Accessibility test a subset of generated HTML files
 */
const { pa11yConsecutive } = require('./tools/tasks/gulp-pa11y');

gulp.task('test:accessibility', () => gulp
  .src([
    'dist/public/patterns/**/*.html', // All html
    '!dist/public/patterns/**/*.markup-only.html', // Except the fragment pages
    '!dist/public/patterns/**/index.html', // Except the aggregate, auto-generated pages
  ])
  .pipe(pa11yConsecutive()));

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
  contentBase: path.resolve(__dirname, 'dist/'), // ie dist/pl
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
  // 'compile:scss-to-json',
  'compile:twig-namespaces',
  'compile:pl',
]));

/**
 * Run tests against non-webpack assets
 */
gulp.task('test', gulp.parallel([
  'test:accessibility',
]));

/**
 * Active server watching via webpack dev server for non-webpack assets.
 */
gulp.task('webpack:dev', gulp.series([
  'webpack:server',
  // 'webpack:watch:scss-to-json',
  'webpack:watch:pl-source',
]));

/**
 * Kicking off cold should compile all the non-webpack assets, start webpack:dev
 */
gulp.task('default', gulp.series([
  'compile',
  'webpack:dev',
]));
