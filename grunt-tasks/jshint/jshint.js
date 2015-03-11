module.exports = function (grunt, config) {
  "use strict";

  var jsDir = config.jsDir || "./";

  grunt.config.merge({
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        force: true
      },
      js: {
        files: {
          src: [
            jsDir + "**/*.js",
            "!" + jsDir + "lib/**",
            "Gruntfile.js",
            "grunt-tasks/**/*.js"
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