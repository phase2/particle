module.exports = function (grunt, config) {
  "use strict";
  // `config` vars set in `Gruntconfig.yml`

  var scssLintForce = true;
  if (grunt.option('noTestForce')) {
    scssLintForce = false;
  }


  grunt.config.merge({
    sass: {
      options: {
        sourceMap: true,
        sourceMapEmbed: true,
        outputStyle: 'expanded'
      },
      dist: {
        files: [{
          src: config.scssDir + 'style.scss',
          dest: config.scssDest
        }]
      }
    },
    sass_globbing: {
      smacss_import: {
        files: {
          'scss/99-imports/_00-config.scss': config.scssDir + '00-config/**/*.scss',
          'scss/99-imports/_10-base.scss': config.scssDir + '10-base/**/*.scss',
          'scss/99-imports/_20-vendor.scss': config.scssDir + '20-vendor/**/*.scss',
          'scss/99-imports/_30-global.scss': config.scssDir + '30-global/**/*.scss',
          'scss/99-imports/_40-components.scss': config.scssDir + '40-components/**/*.scss',
          'scss/99-imports/_50-templates.scss': config.scssDir + '50-templates/**/*.scss',
          'scss/99-imports/_60-pages.scss': config.scssDir + '60-pages/**/*.scss'
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
    postcss: {
      options: {
        map: {
          prev: false,
          inline: true
        },
        processors: [
          require('autoprefixer-core')({
            browsers: [
              'last 2 versions',
              'IE >= 9'
            ]
          })
        ]
      },
      styles: {
        src: config.scssDest
      }
    },
    scsslint: {
      "options": {
        "bundleExec": config.scssConfigRoot,
        "config": config.scssConfigRoot + ".scss-lint.yml",
        "force": scssLintForce,
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
        files: [
          config.scssDir + "**/*.scss",
          "!" + config.scssDir + "99-imports/**/*",
          "!" + config.scssDir + "**/*tmp*.*"
        ],
        tasks: [
          "stylesCompile",
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
    'postcss:styles'
  ]);

};
