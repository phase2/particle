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
          src: '<%= pkg.plbuild.scssDir %>/style.scss',
          dest: '<%= pkg.plbuild.scssDest %>/'
        }]
      }
    },
    sass_globbing: {
      options: {
        useSingleQuotes: false
      },
      partials: {
        src: '<%= pkg.plbuild.scssDir %>/**/_*.scss',
        dest: '<%= pkg.plbuild.scssDir %>/_all-partials.scss'
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
        src: '<%= pkg.plbuild.scssDest %>'
      }
    },
    scsslint: {
      "options": {
        "bundleExec": "<%= pkg.plbuild.scssConfigRoot %>",
        "config": "<%= pkg.plbuild.scssConfigRoot %>/.scss-lint.yml",
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
          "<%= pkg.plbuild.scssDir %>/**/*.scss",
          "!<%= pkg.plbuild.scssDir %>/**/*tmp*.*"
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
