module.exports = function (grunt) {
  "use strict";
  var _ = require("lodash");
  var config = grunt.file.readJSON("Gruntconfig.json");
  if (grunt.file.exists("Gruntconfig--custom.json")) {
    var customConfigOverrides = grunt.file.readJSON("Gruntconfig--custom.json");
    _.extend(config, customConfigOverrides);
  }

  // Begin Config

  // First, let's initialize an empty config; this is where most people put tasks - *all* of them.
  grunt.config.init({}); // also known as: `grunt.initConfig`
  // Instead, let's merge the config of a full feature in, one at a time, with `grunt.config.merge`.

  // Begin Modular Config
  require('./grunt-tasks/pattern-lab/pattern-lab.js')(grunt, config);
  //require('./grunt-tasks/compass/compass.js')(grunt, config);
  require('./grunt-tasks/libsass/libsass.js')(grunt, config);
  require('./grunt-tasks/jshint/jshint.js')(grunt, config);
  //require('./grunt-tasks/drupal7/drupal7.js')(grunt, config);
  require('./grunt-tasks/icons/icons.js')(grunt, config);
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
    }
  });
  // End Misc Config


// End Config

// Begin Task Aliases
  grunt.registerTask("compile", [
    "plBuild",
    "icons-build",
    "pattern_lab_component_builder",
    "stylesCompile",
    "shell:plBuild",
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
