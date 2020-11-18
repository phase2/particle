export enum FrontendFrameworkOptions {
  REACT = 'react',
  WEBCOMPONENTS = 'webcomponents',
}

export enum TestingLibraryOptions {
  CYPRESS = 'cypress',
  JEST = 'jest',
}

export interface Dist {
  dist?: string
}

export interface Bundle {
  name: string
  frontendFramework?: FrontendFrameworkOptions,
  storybook?: Dist
  drupal?: Dist
}

export interface BundleAnswers {
  frontendFramework: FrontendFrameworkOptions
  name: string
  storybook: string
  drupal?: string
}

export interface CustomAnswers {
  bundles: Bundle[]
  designRoot: string
  nameSpace: string
  projectName: string
  testingLibraries: TestingLibraryOptions[]
  hasDrupal?: boolean
  drupal?: string
  cliVersion?: string
}

export interface ConfigurationAnswers {
  config: CustomAnswers
}

export interface StorybookConfig {
  root: string
  name: string
  dist: string
  frontendFramework: string
}

