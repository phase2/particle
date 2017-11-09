// Rule reference: http://eslint.org/docs/rules
// Individual rule reference: http://eslint.org/docs/rules/NAME-OF-RULE
module.exports = {
  extends: "airbnb",
  globals: {
    Drupal: true,
    jQuery: true,
    _: true,
    BUILD_TARGET: true,
  },
  env: {
    "browser": true,
  },
  rules: {
    'no-console': [0], // turned off for now while we are console.logging everywhere.
    'no-shadow': ["error", {"allow": ["state"]}], // for vuex state getter functions.
    'react/require-extension': [0],
    'import/no-extraneous-dependencies': ["error", {"devDependencies": true}],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.shared.config.js'
      }
    }
  }
};
