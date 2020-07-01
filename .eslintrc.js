/**
 * Use AirBnB ES6 linting standards, as well as a Jest plugin for tests
 *
 * Rule reference: http://eslint.org/docs/rules
 * Individual rule reference: http://eslint.org/docs/rules/NAME-OF-RULE
 */

module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  root: true,
  env: {
    node: true,
  },
  rules: {
    'no-console': [0], // turned off for now while we are console.logging everywhere.
    quotes: [2, 'single', { avoidEscape: true }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
}
