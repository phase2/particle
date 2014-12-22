module.exports = function (grunt) {
  "use strict";
  var path = require('path');
  var _ = require('underscore');
  var customConfig = grunt.file.readJSON("Gruntconfig.json");
  if (grunt.file.exists("Gruntconfig--custom.json")) {
    var customConfigOverrides = grunt.file.readJSON("Gruntconfig--custom.json");
    _.extend(customConfig, customConfigOverrides);
  }

  require('load-grunt-config')(grunt, {
    // https://github.com/firstandthird/load-grunt-config
    // path to task.js files, defaults to grunt dir
    configPath: [
        path.join(process.cwd(), 'grunt')
      ],

    // auto grunt.initConfig
    init: true,

    // data passed into config.  Can use with <%= test %>
    data: {
      test: false,
      custom: customConfig
    },

    jitGrunt: {
      staticMappings: {
        'scsslint': 'grunt-scss-lint'
      }
    },
    
    // can optionally pass options to load-grunt-tasks.
    // If you set to false, it will disable auto loading tasks.
    //loadGruntTasks: {
    //  pattern: 'grunt-*',
    //  config: require('./package.json'),
    //  scope: 'devDependencies'
    //},

    //can post process config object before it gets passed to grunt
    postProcess: function (config) {
    },

    //allows to manipulate the config object before it gets merged with the data object
    preMerge: function (config, data) {
    }
  });

};
