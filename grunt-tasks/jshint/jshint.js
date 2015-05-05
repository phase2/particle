module.exports = function (grunt, config) {
  "use strict";
  // `config` vars set in `Gruntconfig.yml`

  grunt.config.merge({
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        force: true
      },
      js: {
        files: {
          src: [
            config.jsDir + "**/*.js",
            "!" + config.jsDir + "lib/**",
            "Gruntfile.js",
            "grunt-tasks/**/*.js",
            "!**/node_modules/**/*",
            "!**/bower_components/**/*"
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