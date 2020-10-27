export enum FrontendFrameworkOptions {
  REACT = 'react',
  WEBCOMPONENTS = 'webcomponents',
}

export interface Naming {
  componentLibraryPath: string
  drupalRootPath: string
  projectName: string
  themeName: string
}

export enum TestingLibraryOptions {
  CYPRESS = 'cypress',
  JEST = 'jest',
  LOKI = 'loki',
  PA11Y = 'pa11y',
  SELENIUM = 'selenium',
}

export interface DesignTheme {
  frontendFramework: FrontendFrameworkOptions,
  themeName: string,
  themePath: string,
}

export interface CustomAnswers {
  clientAbbreviation: string
  designThemes: DesignTheme[]
  hasDrupal: boolean
  hasSVG: boolean
  hasTypescript: boolean
  projectName: string
  testingLibraries: TestingLibraryOptions[]
  drupalRootPath?: string
  typescriptEsm?: boolean
}

export interface ConfigurationAnswers {
  config: CustomAnswers
}

export interface Answers extends Naming {
  options: CustomAnswers
}
