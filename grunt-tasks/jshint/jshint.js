module.exports = function (grunt, config) {
  "use strict";
  // `config` vars set in `Gruntconfig.yml`
  
  var jsHintForce = true;
  if (grunt.option('noTestForce')) {
    jsHintForce = false;
  }

  grunt.config.merge({
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        force: jsHintForce
      },
      js: {
        files: {
          src: [
            config.jsDir + "**/*.js",
            "!" + config.jsDir + "lib/**",
            "Gruntfile.js",
            "grunt-tasks/**/*.js",
            "!" + config.jsDir + "**/node_modules/**/*",
            "!" + config.jsDir + "**/bower_components/**/*"
          ]
        }
      }
    },
    watch: {
      js: {
        files: "<%= jshint.js.files.src %>",
        tasks: [
          "shell:livereload",
          "newer:jshint:js"
        ]
      }
    }
  });
  
};
