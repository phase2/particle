// @TODO Divide Base Config from 'Rules' Configs
module.exports = {
  extends: ['airbnb-base'],
  env: {
    browser: true,
    node: true,
  },
  plugins: ['eslint-plugin-import'],
  rules: {
    'no-console': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
}
