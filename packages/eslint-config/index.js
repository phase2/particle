// @TODO Divide Base Config from 'Rules' Configs
module.exports = {
  extends: ['airbnb-base'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-console': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
}
