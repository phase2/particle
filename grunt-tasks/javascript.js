module.exports = function (grunt) {
  "use strict";

  var jsFiles = [
    "<%= pkg.plbuild.jsDir %>/**/*.js",
    "Gruntfile.js",
    "grunt-tasks/**/*.js",
    "!<%= pkg.plbuild.jsDir %>/**/node_modules/**/*",
    "!<%= pkg.plbuild.jsDir %>/**/bower_components/**/*"
  ];

  var jsHintForce = true;
  if (grunt.option('noTestForce')) {
    jsHintForce = false;
  }

  //var jsHintSrc = jsFiles;
  //jsHintSrc.push("!<%= babel.js.src %>");

  grunt.config.merge({
    watch: {
      js: {
        files: jsFiles,
        tasks: [
          "newer:babel:js",
          "shell:livereload",
          "newer:jshint:js"
        ]
      }
    },
    // https://github.com/babel/grunt-babel
    babel: {
      options: {
        sourceMap: true
      },
      js: {
        src: "<%= pkg.plbuild.jsDir %>/es6/**/*.{js,jsx}",
        dest: "<%= pkg.plbuild.jsDir %>/compiled-from-es6.js"
      }
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc",
        force: jsHintForce
      },
      js: {
        files: {
          src: jsFiles.concat("!<%= babel.js.src %>") // ignoring jshinting of ES6 for now @todo
        }
      }
    }
  });

};
