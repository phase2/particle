// @TODO Divide Base Config from 'Rules' Configs
module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-console': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
}
