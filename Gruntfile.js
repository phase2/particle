module.exports = function (grunt) {
  "use strict";
  var _ = require("underscore");
  var config = grunt.file.readJSON("Gruntconfig.json");
  if (grunt.file.exists("Gruntconfig--custom.json")) {
    var customConfigOverrides = grunt.file.readJSON("Gruntconfig--custom.json");
    _.extend(config, customConfigOverrides);
  }

// Begin Config
  // First, let's initialize an empty config; this is where most people put tasks - *all* of them. 
  grunt.config.init({}); // also known as: `grunt.initConfig`
  // Instead, let's merge the config of a full feature in, one at a time, with `grunt.config.merge`.
  
  // Begin Pattern Lab
  grunt.config.merge({
    shell: {
      plBuild: {
        command: "php " + config.plDir + "core/builder.php --generate --nocache"
      },
      livereload: {
        command: "touch .change-to-reload.txt"
      }
    },
    jsonlint: {
      pl: {
        src: [
          config.plDir + "source/_patterns/**/*.json",
          config.plDir + "source/_data/*.json"
        ]
      }
    },
    watch: {
      pl: {
        files: config.plDir + "source/**/*.*",
        tasks: [
          "shell:plBuild",
          "shell:livereload",
          "newer:jsonlint:pl"
        ]
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ".change-to-reload.txt"
      }
    },
    // local server
    connect: { // https://www.npmjs.org/package/grunt-contrib-connect
      pl: {
        options: {
          port: 9005,
          useAvailablePort: true,
          base: config.serverDir,
          keepalive: true,
          livereload: true,
          open: "http://0.0.0.0:9005/" + config.serverPath
        }
      }
    },
    pattern_lab_component_builder: {
      colors: {
        options: {
          regex: "^\\$color--.*",
          allow_var_values: false
        },
        src: config.scssDir + '_vars.scss',
        dest: config.plDir + 'source/_patterns/00-atoms/01-global/00-colors.json'
      },
      fontSizes: {
        options: {
          regex: "^\\$font-size.*",
          allow_var_values: false
        },
        src: config.scssDir + '_vars.scss',
        dest: config.plDir + "source/_patterns/00-atoms/02-text/00-font-sizes.json"
      },
      breakpoints: {
        options: {
          regex: '^\\$bp.*',
          allow_var_values: false
        },
        src: config.scssDir + '_vars.scss',
        dest: config.plDir + "source/_patterns/01-molecules/01-layout/99-breakpoints.json"
      }
    }
  });
  // End Pattern Lab

  // Begin JS
  grunt.config.merge({
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        force: true
      },
      js: {
        files: {
          src: [
            config.jsDir + "**/*.js",
            "!" + config.jsDir + "lib/**",
            "Gruntfile.js"
          ]
        }
      }
    },
    watch: {
      js: {
        files: "<%= jshint.js.files.src %>",
        tasks: [
          "shell:livereload",
          "newer:jshint:js"
        ]
      }
    }
  });
  // End JS

  // Begin Misc Config
  grunt.config.merge({
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: [
          "watch",
          "connect"
        ]
      }
    }
  });
  // End Misc Config

  // Begin Modular Config
  require('./grunt-tasks/drupal7.js')(grunt);
  require('./grunt-tasks/compass/compass.js')(grunt, config);
  //require('./grunt-tasks/libsass/libsass.js')(grunt, config);
  require('./grunt-tasks/icons.js')(grunt);
  // End Modular Config

// End Config

// Begin Task Aliases
  grunt.registerTask("build", [
    "pattern_lab_component_builder",
    "stylesCompile",
    "shell:plBuild",
    "buildIcons",
    "shell:livereload"
  ]);

  grunt.registerTask("test", [
    "jsonlint",
    "jshint",
    "scsslint"
  ]);

  // this is ran if you do either `grunt default` or `grunt`
  grunt.registerTask("default", [
    "build",
    "concurrent:dev"
  ]);
// End Task Aliases

  require('time-grunt')(grunt); // shows how long grunt tasks take ~ https://github.com/sindresorhus/time-grunt
  require("load-grunt-tasks")(grunt);

};
