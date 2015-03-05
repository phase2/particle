module.exports = function (grunt, options) {
  "use strict";

  var scssDir = options.scssDir || "scss/";
  var scssConfigRoot = options.scssConfigRoot ||  "./";
  
  grunt.config.merge({
    sass: {// https://github.com/sindresorhus/grunt-sass
      options: {// https://github.com/sass/node-sass#options
        sourceMap: true, // @todo fix path to .scss files; see `sources` array in `style.css.map`
        includePaths: [
          scssDir + "**/*.scss"
        ],
        omitSourceMapUrl: false,
        outFile: 'css/style.css',
        outputStyle: 'compressed'
      },
      styles: {
        files: {
          'css/style.css': scssDir + 'style.scss'
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
          "newer:scsslint:styles" // only lint the newly change files
        ]
      }
    }
  });

  grunt.registerTask("stylesCompile", ['sass:styles']);
  
};