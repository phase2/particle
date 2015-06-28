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
  require('./grunt-tasks/js/js.js')(grunt, config, _);
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
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    },
    browserSync: {
      dev: {
        options: {
          proxy: "mysite.local", // you must set URL to your localhost here 
          //tunnel: true, // tunnel your localhost out to the internet ~ http://localtunnel.me
          //reloadDelay: 500,
          watchTask: true,
          open: false,
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
          }
        },
        bsFiles: {
          src: "css/style.css"
        }
      }
    }
  });
  // End Misc Config


// End Config

// Begin Task Aliases
  grunt.registerTask("compile", [
    "babel",
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
    //"browserSync",
    "concurrent:dev"
  ]);
// End Task Aliases

  require('time-grunt')(grunt); // shows how long grunt tasks take ~ https://github.com/sindresorhus/time-grunt
  require("load-grunt-tasks")(grunt);

};
