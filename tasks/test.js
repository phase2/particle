module.exports = function(grunt, options) {
  "use strict";
  grunt.config.merge({
    shell: {
      test: {
        command: "echo " + options.test
      }
    }
  });
};