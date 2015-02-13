module.exports = function (grunt) {
  "use strict";
  var _ = require("underscore");
  var customConfig = grunt.file.readJSON("Gruntconfig.json");
  if (grunt.file.exists("Gruntconfig--custom.json")) {
    var customConfigOverrides = grunt.file.readJSON("Gruntconfig--custom.json");
    _.extend(customConfig, customConfigOverrides);
  }

  var options = {
    "test": "testing..."
  };

// Begin Conventions
  // - All directory variables have trailing slash; this allows us to set it to `./` and have it all be relative to Gruntfile
  // - Use camelCase for naming
  // - When using comments to say a section starts, be sure to include comments to say that it has ended
  // - Comment where it can be confusing for other developers
// End Conventions

// Begin Config
  // First, let's initialize an empty config; this is where most people put tasks - *all* of them. 
  grunt.config.init({}); // also known as: `grunt.initConfig`
  // Instead, let's merge the config of a full feature in, one at a time, with `grunt.config.merge`.

  // Begin Styles
  var scssDir = "scss/";
  var scssConfigRoot = "./"; // where `config.rb` and `Gemfile` exist
  grunt.config.merge({
    shell: {
      stylesCompile: {
        command: "cd " + scssConfigRoot + " && bundle exec compass compile"
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
          "shell:stylesCompile",
          "shell:livereload",
          "newer:scsslint:styles" // only lint the newly change files
        ]
      }
    }
  });
  // End Styles

  // adding another feature to the config...

  // Begin Pattern Lab
  var plDir = "pattern-lab/";
  var serverDir = "./";
  var serverPath = "pattern-lab/public/";
  grunt.config.merge({
    shell: {
      plBuild: {
        command: "php " + plDir + "core/builder.php --generate --nocache"
      },
      livereload: {
        command: "touch .change-to-reload.txt"
      }
    },
    jsonlint: {
      pl: {
        src: [
          plDir + "source/_patterns/**/*.json",
          plDir + "source/_data/*.json"
        ]
      }
    },
    watch: {
      pl: {
        files: plDir + "source/**/*.*",
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
          base: serverDir,
          keepalive: true,
          livereload: true,
          open: "http://0.0.0.0:9005/" + serverPath
        }
      }
    }
  });
  // End Pattern Lab

  // Begin JS
  var jsDir = "js/";
  grunt.config.merge({
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        force: true
      },
      js: {
        files: {
          src: [
            jsDir + "**/*.js",
            "!" + jsDir + "lib/**",
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
      build: {
        tasks: [
          "shell:plBuild",
          "shell:stylesCompile",
          "buildIcons"
        ]
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
  require('./tasks/test.js')(grunt, options);
  require('./tasks/drupal7.js')(grunt, options);
  require('./tasks/icons.js')(grunt);
  // End Modular Config

// End Config

// Begin Task Aliases
  grunt.registerTask("build", [
    "concurrent:build",
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
