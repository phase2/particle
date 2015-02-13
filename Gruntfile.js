module.exports = function (grunt) {
  "use strict";
  var _ = require("underscore");
  var customConfig = grunt.file.readJSON("Gruntconfig.json");
  if (grunt.file.exists("Gruntconfig--custom.json")) {
    var customConfigOverrides = grunt.file.readJSON("Gruntconfig--custom.json");
    _.extend(customConfig, customConfigOverrides);
  }
  
  // Begin Conventions
    // - All directory variables have trailing slash; this allows us to set it to `./` and have it all be relative to Gruntfile
    // - Use camelCase for naming
    // - When using comments to say a section starts, be sure to include comments to say that it has ended
    // - Comment where it can be confusing for other developers
  // End Conventions
  
  // First, let's initialize an empty config; this is where most people put tasks - *all* of them. 
  grunt.config.init({}); // also known as: `grunt.initConfig`
  // Instead, let's merge the config of a full feature in, one at a time, with `grunt.config.merge`.
  
  // Begin Styles
  var scssDir = "../scss/";
  var scssConfigRoot = "../"; // where `config.rb` and `Gemfile` exist
  grunt.config.merge({
    shell: {
      stylesCompile: {
        command: "cd " + scssConfigRoot + " && bundle exec compass compile"
      }
    },
    scsslint: {
      styles: {
        src: scssDir + "**/*.scss"
      }
    },
    watch: {
      styles: {
        files: scssDir + "**/*.scss",
        tasks: [
          "shell:stylesCompile",
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
          "newer:jsonlint:pl"
        ]
      }
    },
    connect: { // https://www.npmjs.org/package/grunt-contrib-connect
      options: {
        port: 9001,
        useAvailablePort: true,
        base: serverDir,
        keepalive: true,
        livereload: true,
        open: "http://0.0.0.0:9001/" + serverPath
      }
    }
  });
  // End Pattern Lab

  require("load-grunt-tasks")(grunt);

};
