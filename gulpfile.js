'use strict';
var gulp = require('gulp');
var yaml = require('js-yaml');
var fs = require('fs');
var config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
var tasks = {
  'compile': [],
  'watch': [],
  'validate': [],
  'default': []
};

if (config.browserSync.enabled) {
  require('p2-theme-core/lib/browser-sync.js')(gulp, config, tasks);
}

if (config.js.enabled) {
  require('p2-theme-core/lib/js.js')(gulp, config, tasks);
}

if (config.css.enabled) {
  require('p2-theme-core/lib/css.js')(gulp, config, tasks);
}

if (config.icons.enabled) {
  require('p2-theme-core/lib/icons.js')(gulp, config, tasks);
}

if (config.patternLab.enabled) {
  require('p2-theme-core/lib/pattern-lab.js')(gulp, config, tasks);
}

gulp.task('compile', tasks.compile);
gulp.task('validate', tasks.validate);
gulp.task('watch', tasks.watch);
tasks.default.push('compile');
tasks.default.push('watch');
gulp.task('default', tasks.default);
