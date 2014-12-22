module.exports = function (grunt, options) {
  "use strict";
  return {
    shell: {
      command: 'touch change-to-reload.txt'
    },
    watch: {
      options: {
        livereload: true
      },
      files: ['change-to-reload.txt']
    }
  };
};
