'use strict';
var gulp = require('gulp');
var yaml = require('js-yaml');
var fs = require('fs');
// `rc` allows all config options to be overridden with CLI flags like `--js.enabled=''` or in `~/.p2-theme-corerc` files, among many others: https://www.npmjs.com/package/rc
var localConfig = yaml.safeLoad(fs.readFileSync('./gulpconfig.yml', 'utf8'));
var config = require('rc')('p2-theme-core', localConfig);
var tasks = {
  'compile': [],
  'watch': [],
  'validate': [],
  'clean': [],
  'default': []
};

require('p2-theme-core')(gulp, config, tasks);

gulp.task('clean', gulp.parallel(tasks.clean));
gulp.task('compile', gulp.series(
  'clean',
  gulp.parallel(tasks.compile)
));
gulp.task('validate', gulp.parallel(tasks.validate));
gulp.task('watch', gulp.parallel(tasks.watch));
tasks.default.push('watch');
gulp.task('default', gulp.series(
  'compile',
  gulp.parallel(tasks.default)
));
