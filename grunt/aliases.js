module.exports = function (grunt, options) {
  "use strict";
  var _ = require('underscore');
  
  var build = [
    "update",
    "newer:pattern_lab_component_builder",
    "compass_compile",
    "modernizr",
    "injector",
    "shell:pl_build",
    "shell:livereload",
    "notify:build"
  ];
  
  var buildAll = build;
  
  if (options.custom.patternLab === false) {
    build = _.without(build, "newer:pattern_lab_component_builder", "shell:pl_build", "injector");
  }
  if (options.custom.updateAtStart === false) {
    build = _.without(build, "update");
  }
  if (options.custom.buildModernizrAtStart === false) {
    build = _.without(build, "modernizr");
  }
  
  return {
    "default": [
      "build",
      "parallel:watch"
    ],
    "build": build,
    "buildAll": buildAll,
    "update": [
      "shell:update_bundler",
      "shell:update_node",
      "shell:update_bower"
    ]
  };
};
