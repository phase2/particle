import {
  buildConfig,
  template,
  callback,
  baseConfig,
  reactConfig,
} from '../bin/eslint-config'
import {
  CSSLibraryOptions,
  ComponentLibraryOptions,
  FrontendFrameworkOptions,
  TestingLibraryOptions,
} from '../../particle-cli/src/types'
import fs from 'fs'

jest.mock('fs')

const reactInput = {
  projectName: 'example',
  componentLibraryName: 'particle',
  componentLibraryPath: './project/components/particle/',
  config: 'modern_react',
  options: {
    cssLibrary: CSSLibraryOptions.TAILWIND,
    componentLibraryTypes: [ComponentLibraryOptions.STORYBOOK],
    frontendFramework: [FrontendFrameworkOptions.REACT],
    hasSVG: true,
    hasTypescript: true,
    testingLibraries: [TestingLibraryOptions.JEST],
    typescriptEsm: false,
  },
}

describe('buildConfig()', () => {
  test('no config', () => {
    buildConfig()
    expect(fs.writeFile).toHaveBeenCalledWith(
      '.eslintrc.js',
      template(baseConfig),
      'utf8',
      callback
    )
  })
  test('react config', () => {
    buildConfig(reactInput)
    expect(fs.writeFile).toHaveBeenCalledWith(
      '.eslintrc.js',
      template({ ...baseConfig, ...reactConfig }),
      'utf8',
      callback
    )
  })
})
