module.exports = {
  extends: ['prettier/@typescript', './index.js'],
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:import/typescript',
      ],
    },
  ],
}
