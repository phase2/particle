// @TODO Divide Base Config from 'Rules' Configs
module.exports = {
  extends: [
    // Min to Keep
    'airbnb-base',
    // Jest plugin - write jest testing for all packages
    'plugin:jest/recommended',
    // Abstract Vue to @phase2/eslint-config-vue
    'plugin:vue/recommended',
    // Prettier plugin - belongs to base
    'plugin:prettier/recommended',
    // Abstract Vue to @phase2/eslint-config-vue
    'prettier/vue',
  ],
  // Keep for Base
  plugins: ['prettier'],
  // Remove from Base, Project should config these directly.
  root: true,
  // Abstract globals to context sub-packages.
  globals: {
    // Abstract Drupal to @phase2/eslint-config-drupal
    Drupal: true,
    jQuery: true,
    _: true,
    // ???
    BUILD_TARGET: true,
  },
  // ???
  env: {
    browser: true,
    node: true,
  },
  // P2 only custom rule.
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
}
