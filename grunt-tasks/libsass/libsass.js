module.exports = function (grunt, config) {
  "use strict";
  // `config` vars set in `Gruntconfig.yml`

  grunt.config.merge({
    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'nested' // 'expanded' and 'compact' not supported by libsass yet
      },
      dist: {
        files: {
          'css/style.css': config.scssConfigRoot + config.scssDir + 'style.scss'
        }
      }
    },
    sass_globbing: {
      smacss_import: {
        files: {
          'scss/99-imports/_00-config.scss': config.scssConfigRoot + config.scssDir + '00-config/**/*.scss',
          'scss/99-imports/_10-base.scss': config.scssConfigRoot + config.scssDir + '10-base/**/*.scss',
          'scss/99-imports/_20-vendor.scss': config.scssConfigRoot + config.scssDir + '20-vendor/**/*.scss',
          'scss/99-imports/_30-global.scss': config.scssConfigRoot + config.scssDir + '30-global/**/*.scss',
          'scss/99-imports/_40-components.scss': config.scssConfigRoot + config.scssDir + '40-components/**/*.scss',
          'scss/99-imports/_50-templates.scss': config.scssConfigRoot + config.scssDir + '50-templates/**/*.scss',
          'scss/99-imports/_60-pages.scss': config.scssConfigRoot + config.scssDir + '60-pages/**/*.scss'
        },
        options: {
          useSingleQuotes: false
        }
      }
    },
    //shell: {
    //  stylesCompile: {
    //    //command: "cd " + config.scssConfigRoot + " && bundle exec compass compile"
    //    command: "echo hello world"
    //  }
    //},
    autoprefixer: {
      options: {
        // browser query docs: https://github.com/ai/browserslist#queries
        browsers: [
          'last 2 versions',
          'IE >= 9'
        ]
      },
      styles: {
        src: 'css/style.css',
        dest: 'css/style.css'
      }
    },
    scsslint: {
      "options": {
        "bundleExec": config.scssConfigRoot,
        "config": config.scssConfigRoot + ".scss-lint.yml",
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
        files: [config.scssDir + "**/*.scss", "!scss/99-imports/**/*"],
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

  grunt.registerTask("stylesCompile", [
    'sass_globbing:smacss_import',
    'sass',
    'autoprefixer:styles'
  ]);

};
