export const _cypress: object = {
  plugins: ['cypress'],
  env: {
    'cypress/globals': true,
  }
}

export const _jest: object = {
  extends: ['plugin:jest/recommended'],
  rules: {
    'jest/expect-expect': 'off',
  },
}

export const _react: object = {
  extends: ['prettier/react'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
}

export const _typescript: object = {
  extends: ['prettier/@typescript'],
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

export const _vue: object = {
  extends: ['plugin:vue/recommended', 'prettier/vue'],
}

export const _main = {
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
