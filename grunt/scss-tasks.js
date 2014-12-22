module.exports = function (grunt, options) {
  "use strict";
  var _ = require('underscore');
  var files = {
    "all": [
      '<%= package.paths.drupal_base %>/scss/**/*.scss',
      '!<%= package.paths.drupal_base %>/scss/**/*scsslint_tmp*.scss'
    ],
    "lint": [
      '<%= package.paths.drupal_base %>/scss/**/*.scss',
      '!<%= package.paths.drupal_base %>/scss/vendor/*.scss',
      '!<%= package.paths.drupal_base %>/scss/_mac-base.scss'
    ]
  };
  
  var tasks = [
    'shell:scss_compile',
    'newer:pattern_lab_component_builder',
    'shell:livereload',
    'newer:scsslint:scss'
  ];
  
  if (options.custom.patternLab === false) {
    tasks = _.without(tasks, "newer:pattern_lab_component_builder");  
  }

  grunt.registerTask('compass_compile', ['shell:scss_compile']);
  grunt.registerTask('compass_watch', ['shell:scss_watch']);
  
  return {
    watch: {
      files: files.all,
      tasks: tasks
    },
    shell__compile: {
      command: 'cd <%= package.paths.drupal_us %> && bundle exec compass compile'
    },
    shell__watch: {
      command: 'cd <%= package.paths.drupal_us %> && bundle exec compass watch'
    },
    scsslint: {// https://www.npmjs.org/package/grunt-scss-lint
      src: files.lint
    },
    scsslint__strict: {
      options: {
        config: '../.scss-lint--strict.yml'
      },
      src: files.lint
    }
  };
};
