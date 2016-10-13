'use strict';
const gulp = require('gulp');
// `rc` allows all config options to be overridden with CLI flags like `--js.enabled=''` or in `~/.p2-theme-corerc` files, among many others: https://www.npmjs.com/package/rc
const config = require('rc')('p2-theme-core', require('./gulpconfig.js'));
const themeCore = require('p2-theme-core');

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
