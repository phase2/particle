export enum FrontendFrameworkOptions {
  REACT = 'react',
  WEBCOMPONENTS = 'webcomponents',
}

export enum TestingLibraryOptions {
  CYPRESS = 'cypress',
  JEST = 'jest',
  LOKI = 'loki',
  PA11Y = 'pa11y',
  SELENIUM = 'selenium',
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
  consuming?: boolean
  drupal?: string
}

export interface CustomAnswers {
  bundles: Bundle[]
  designRoot: string
  hasTypescript: boolean
  nameSpace: string
  projectName: string
  testingLibraries: TestingLibraryOptions[]
  typescriptEsm?: boolean
  hasDrupal?: boolean
  drupal?: string
  cliVersion?: string
}

export interface ConfigurationAnswers {
  config: CustomAnswers
}
