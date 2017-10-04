const path = require('path');

const gulp = require('gulp');
const shell = require('gulp-shell');

// `rc` allows all config options to be overridden with CLI flags like `--js.enabled=''` or in `~/.p2-theme-corerc` files, among many others: https://www.npmjs.com/package/rc
const config = require('rc')('p2-theme-core', require('./gulpconfig.js'));
const themeCore = require('p2-theme-core');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const wpconfig = require('./webpack.pl.config');
const localhost = 'http://localhost:8080';

const tasks = {
  compile: [],
  watch: [],
  validate: [],
  clean: [],
  default: [],
};

themeCore(gulp, config, tasks);

gulp.task('clean', gulp.parallel(tasks.clean));
gulp.task('compile', gulp.series(
  'clean',
  gulp.series(tasks.compile)
));
gulp.task('validate', gulp.parallel(tasks.validate));
gulp.task('watch', gulp.parallel(tasks.watch));
tasks.default.push('watch');
gulp.task('default', gulp.series(
  'compile',
  gulp.parallel(tasks.default)
));



// Hold a reference to Webpack Dev Server when it is created
let wpds = null;

// Trigger a full reload of the Webpack Dev Server page
function reloadWebpackDevServer(cb) {
  // Bail if there is now WPDS for some reason
  if (wpds === null) {
    cb();
    return false;
  }

  console.log('Reload Webpack Dev Server!');

  // Nukes the "state" hash
  wpds.sockWrite(wpds.sockets, 'hash', "");
  // Then sends the signal that compares the previous hash, causing a FULL refresh
  wpds.sockWrite(wpds.sockets, 'ok');
  cb();
  return true;
}

/**
 * Starts up the Webpack Dev Server and does the config adjustments that this
 * command does:
 *   webpack-dev-server --hot --inline --progress
 *
 * Note the absolute requirements for Hot Module Reloading in this Dev Server:
 *  - HtModuleReplacement plugin
 *  - Added entry points
 */
gulp.task('webpack:server', (cb) => {

  // Add HotModuleReplacementPlugin to the end of the webpack plugins
  wpconfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Set these new entry points required for Hot Module replacement
  wpconfig.entry['pattern-lab'].unshift(
    `webpack-dev-server/client?${localhost}/`,
    'webpack/hot/dev-server',
  );

  // Make a new server and store a reference to it so we can interact with it later
  wpds = new WebpackDevServer(webpack(wpconfig), {
    // ie http://localhost:8080/temp
    publicPath: `${localhost}${wpconfig.output.publicPath}`,
    // ie pattern-lab/public
    contentBase: path.resolve(__dirname, 'pattern-lab', 'public'),
    hot: true,
    historyApiFallback: true,
    inline: true,
    stats: {
      colors: true,
    }
  });

  wpds.listen(8080, 'localhost', function (err, result) {
    if (err) {
      cb(err);
      return false;
    }

    console.log(`Listening at ${localhost}`);
    cb();
    return true;
  });
});

/**
 * Watch the known PL output changes (latest-change.text in public)
 */
gulp.task('webpack:server:pl-html-updated', (cb) => {
  gulp.watch('pattern-lab/public/latest-change.txt').on('change', gulp.series(reloadWebpackDevServer));
  cb();
});

/**
 * Watch known PL files and compile to html
 */
gulp.task('webpack:watch:pl-source', (cb) => {
  // gulp.watch('source/**/*.{twig,json,yml,yaml,md}', gulp.series('pl'));

  gulp.watch('source/**/*.{twig,json,yml,yaml,md}', gulp.series(shell.task([
    'php ./pattern-lab/core/console --generate',
  ])));

  cb();
});

/**
 * Wire tasks together
 */
gulp.task('webpack:dev', gulp.series([
  'webpack:server',
  'webpack:server:pl-html-updated',
  'webpack:watch:pl-source',
]));
