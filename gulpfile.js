'use strict';
const gulp = require('gulp');
const path = require('path');
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
function reloadWebpackDevServer() {

  if (wpds === null) {
    return false;
  }

  console.log('Reload Webpack Dev Server!');

  wpds.sockWrite(wpds.sockets, 'hash', "");
  wpds.sockWrite(wpds.sockets, 'ok');
  return true;
}

/**
 * Starts up the Webpack Dev Server and does the config adjustments that this
 * command does:
 *   webpack-dev-server --hot --inline --progress
 */
gulp.task('webpack:server', (cb) => {

  // Absolute requirements for Hot Module Reloading in this Dev Server
  wpconfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  wpconfig.entry['pattern-lab'].unshift(
    `webpack-dev-server/client?${localhost}/`,
    'webpack/hot/dev-server',
  );

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
 * Watch the known PL output changes
 */
gulp.task('webpack:watch-html', () => {
  gulp.watch('pattern-lab/public/patterns/**/*.html').on('change', reloadWebpackDevServer);
});

gulp.task('webpack:dev', gulp.series(['webpack:server', 'webpack:watch-html']));
