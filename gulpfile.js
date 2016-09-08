'use strict';
var gulp = require('gulp');
var yaml = require('js-yaml');
var fs = require('fs');
var config = yaml.safeLoad(fs.readFileSync('./gulpconfig.yml', 'utf8'));
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
