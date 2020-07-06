#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

import { Answers, FrontendFrameworkOptions } from '../../particle-cli/src/types'
import { ESLintConfig } from '../src/types'

export const baseConfig = {
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  root: true,
  rules: {
    'no-console': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'jest/expect-expect': 'off',
  },
}

export const reactConfig = {
  ...baseConfig,
  extends: [...baseConfig.extends, 'prettier/react'],
  rules: {
    ...baseConfig.rules,
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

export const callback = (err: Error) => {
  if (err) throw err
  console.log('The file has been saved!')
}

export const template = (config: ESLintConfig) => `
/**
 * Use AirBnB ES6 linting standards, as well as a Jest plugin for tests
 *
 * Rule reference: http://eslint.org/docs/rules
 * Individual rule reference: http://eslint.org/docs/rules/NAME-OF-RULE
 */
module.exports = ${JSON.stringify(config, null, 2)}
`

const ensureDirectoryExistence = (filePath:string) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

export const buildConfig = (data?: Answers): void => {
  const path =
    data && data.componentLibraryPath ? data.componentLibraryPath : './'
  const filePath = `${path}.eslintrc.js`
  let config: ESLintConfig = baseConfig
  if (
    data &&
    data.options.frontendFramework.includes(FrontendFrameworkOptions.REACT)
  ) {
    config = reactConfig
  }
  ensureDirectoryExistence(filePath)
  fs.writeFile(filePath, template(config), 'utf8', callback)
}
