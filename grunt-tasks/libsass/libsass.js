module.exports = function (grunt, config) {
  "use strict";

  var scssDir = config.scssDir || "scss/";
  var scssConfigRoot = config.scssConfigRoot ||  "./";

  grunt.config.merge({
    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'nested' // 'expanded' and 'compact' not supported by libsass yet
      },
      dist: {
        files: {
          'css/style.css': scssConfigRoot + scssDir + 'style.scss'
        }
      }
    },
    sass_globbing: {
      smacss_import: {
        files: {
          'scss/99-imports/_00-config.scss': scssConfigRoot + scssDir + '00-config/**/*.scss',
          'scss/99-imports/_10-base.scss': scssConfigRoot + scssDir + '10-base/**/*.scss',
          'scss/99-imports/_20-vendor.scss': scssConfigRoot + scssDir + '20-vendor/**/*.scss',
          'scss/99-imports/_30-global.scss': scssConfigRoot + scssDir + '30-global/**/*.scss',
          'scss/99-imports/_40-components.scss': scssConfigRoot + scssDir + '40-components/**/*.scss',
          'scss/99-imports/_50-templates.scss': scssConfigRoot + scssDir + '50-templates/**/*.scss',
          'scss/99-imports/_60-pages.scss': scssConfigRoot + scssDir + '60-pages/**/*.scss'
        },
        options: {
          useSingleQuotes: false
        }
      }
    },
    //shell: {
    //  stylesCompile: {
    //    //command: "cd " + scssConfigRoot + " && bundle exec compass compile"
    //    command: "echo hello world"
    //  }
    //},
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
        files: [scssDir + "**/*.scss", "!scss/99-imports/**/*"],
        tasks: [
          //"shell:stylesCompile",
          "sass_globbing:smacss_import",
          "sass",
          "shell:livereload",
          "newer:scsslint:styles", // only lint the newly change files
          "newer:pattern_lab_component_builder"
        ]
      }
    }
  });

  grunt.registerTask("stylesCompile", ['sass_globbing:smacss_import', 'sass']);

};
