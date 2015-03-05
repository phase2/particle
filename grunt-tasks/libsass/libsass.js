module.exports = function (grunt, options) {
  "use strict";

  var scssDir = options.scssDir || "scss/";
  var scssConfigRoot = options.scssConfigRoot ||  "./";
  
  grunt.config.merge({
    sass: {
      options: {
        sourceMap: true
      },
      styles: {
        files: {
          'css/style.css': 'scss/style.scss'
        }
      }
    },
    scsslint: {
      "options": {
        "bundleExec": scssConfigRoot,
        "config": scssConfigRoot + ".scss-lint.yml",
        "force": true,
        "maxBuffer": 999999,
        "colorizeOutput": true,
        "compact": true
      },
      styles: {
        src: "<%= watch.styles.files %>"
      }
    },
    watch: {
      styles: {
        files: scssDir + "**/*.scss",
        tasks: [
          "sass",
          "shell:livereload",
          "newer:scsslint:styles", // only lint the newly change files
          "newer:pattern_lab_component_builder"
        ]
      }
    }
  });

};