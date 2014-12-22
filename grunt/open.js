module.exports = {
  dev: {
    path: 'public/index.html',
    app: 'Google Chrome'
  },
  stage: {
    path: 'http://mac.elc.p2devcloud.com/',
    app: 'Google Chrome'
  },
  jira: {
    path: 'https://elcjira.atlassian.net/browse/MAC'
  },
  config_grunt: {
    path: 'Gruntfile.js'
  },
  config_bundler: {
    path: '<%= package.paths.drupal_us %>/Gemfile'
  },
  config_compass: {
    path: '<%= package.paths.drupal_us %>/config.rb'
  },
  config_bower: {
    path: '<%= package.paths.drupal_base %>/bower.json'
  },
  edit_readme: {
    path: 'README.md'
  },
  pl_docs: {
    path: "http://patternlab.io/docs/index.html"
  }
};
