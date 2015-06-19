module.exports = function (grunt) {
  "use strict";
  var _ = require("lodash");
  var config = grunt.file.readYAML("Gruntconfig.yml");
  if (grunt.file.exists("Gruntconfig--custom.yml")) {
    var customConfigOverrides = grunt.file.readYAML("Gruntconfig--custom.yml");
    _.extend(config, customConfigOverrides);
  }

  // Begin Config

  // Begin Modular Config
  require('./grunt-tasks/pattern-lab/pattern-lab.js')(grunt, config);
  //require('./grunt-tasks/compass/compass.js')(grunt, config);
  require('./grunt-tasks/libsass/libsass.js')(grunt, config);
  require('./grunt-tasks/jshint/jshint.js')(grunt, config);
  //require('./grunt-tasks/drupal7/drupal7.js')(grunt, config);
  require('./grunt-tasks/icons/icons.js')(grunt, config);
  require('./grunt-tasks/regression-qa/regression-qa.js')(grunt, config);
  // End Modular Config

  // Begin Misc Config
  grunt.config.merge({
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: [
          "watch",
          "connect"
        ]
      }
    },
    bump: {// https://github.com/vojtajina/grunt-bump
      options: {
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    },
    babel: {// https://github.com/babel/grunt-babel
      options: {
        sourceMap: true
      },
      js: {
        src: "js/es6/**/*.{js,jsx}",
        dest: "js/compiled-from-es6.js"
      }
    },
    watch: {
      es6: {
        files: "<%= babel.js.src %>",
        tasks: "newer:babel:js"
      }
    }
  });
  // End Misc Config


// End Config

// Begin Task Aliases
  grunt.registerTask("compile", [
    "plBuild",
    "icons-build",
    "stylesCompile",
    "shell:livereload"
  ]);
  grunt.registerTask("build", "compile");

  grunt.registerTask("validate", [
    "jsonlint",
    "jshint",
    "scsslint"
  ]);

  // this is ran if you do either `grunt default` or `grunt`
  grunt.registerTask("default", [
    "compile",
    "concurrent:dev"
  ]);
// End Task Aliases

  require('time-grunt')(grunt); // shows how long grunt tasks take ~ https://github.com/sindresorhus/time-grunt
  require("load-grunt-tasks")(grunt);

};
