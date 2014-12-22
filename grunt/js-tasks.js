module.exports = function (grunt, options) {
  "use strict";
  var files = [
    '<%= package.paths.drupal_base %>/js/*.js',
    '<%= package.paths.drupal_base %>/template_api/**/*.js', // times out due to too many errors - uh oh
    '!<%= package.paths.drupal_base %>/js/modernizr*.js',
    '<%= package.paths.patternlab %>/js/source/*.js'
  ];
  return {
    "watch": {
      files: files,
      tasks: [
        'shell:livereload',
        'newer:jshint:js'
      ]
    },
    "jshint": {
      "options": {
        "force": true,
        "jshintrc": "../.jshintrc"
      },
      "src": files
    }
  };
};
