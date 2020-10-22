export enum CSSLibraryOptions {
  TAILWIND = 'tailwind',
  SASS = 'sass',
  BOOTSTRAP = 'bootstrap',
}

export enum ComponentLibraryOptions {
  STORYBOOK = 'storybook',
  PATTERN_LAB = 'pattern_lab',
}

export enum FrontendFrameworkOptions {
  TWIG = 'twig',
  REACT = 'react',
  WEBCOMPONENTS = 'webcomponents',
}

export enum ConfigOptions {
  MODERN_REACT = 'modern_react',
  DRUPAL = 'drupal',
  CUSTOM = 'custom',
}

export interface Naming {
  projectName: string
  componentLibraryName: string
  componentLibraryPath: string
  drupalRootPath: string
}

export enum TestingLibraryOptions {
  CYPRESS = 'cypress',
  JEST = 'jest',
  LOKI = 'loki',
  PA11Y = 'pa11y',
  SELENIUM = 'selenium',
}

export interface ConfigurationAnswers extends Naming {
  config: ConfigOptions
}

export interface CustomAnswers {
  cssLibrary: CSSLibraryOptions
  componentLibraryTypes: ComponentLibraryOptions[]
  frontendFramework: FrontendFrameworkOptions[]
  hasSVG: boolean
  hasTypescript: boolean
  testingLibraries: TestingLibraryOptions[]
  typescriptEsm?: boolean
}

export interface Answers extends Naming {
  options: CustomAnswers
}
