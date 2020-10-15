/**
 * Use AirBnB ES6 linting standards, as well as a Jest plugin for tests
 *
 * Rule reference: http://eslint.org/docs/rules
 * Individual rule reference: http://eslint.org/docs/rules/NAME-OF-RULE
 */

module.exports = {
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  root: true,
  globals: {
    Drupal: true,
    jQuery: true,
    // _: true,
    BUILD_TARGET: true,
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-console': [0], // turned off for now while we are console.logging everywhere.
    // @TODO: return to this vv
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
