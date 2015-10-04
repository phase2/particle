module.exports = function (grunt, config) {
  "use strict";
  // `config` vars set in `Gruntconfig.yml`
  
  grunt.config.merge({
    shell: {
      stylesCompile: {
        command: "cd " + config.scssConfigRoot + " && bundle exec compass compile"
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
        files: config.scssDir + "**/*.scss",
        tasks: [
          "shell:stylesCompile",
          "shell:livereload",
          "newer:scsslint:styles", // only lint the newly change files
          "newer:pattern_lab_component_builder"
        ]
      }
    }
  });

  grunt.registerTask("stylesCompile", ['shell:stylesCompile']);

};