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
      options: {
        useSingleQuotes: false
      },
      partials: {
        src: config.scssDir + '**/_*.scss',
        dest: config.scssDir + '_all-partials.scss'
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
          "!" + config.scssDir + "**/*tmp*.*"
        ],
        tasks: [
          "newer:pattern_lab_component_builder",
          "stylesCompile",
          "shell:livereload",
          "newer:scsslint:styles" // only lint the newly change files
        ]
      }
    }
  });

  grunt.registerTask("stylesCompile", [
    'sass_globbing',
    'sass',
    'postcss:styles'
  ]);

};
