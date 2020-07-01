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

interface Naming {
  projectName: string
  designSystemName: string
}

export enum TestingLibraryOptions {
  JEST = 'jest',
  CYPRESS = 'cypress',
  LOKI = 'loki',
  SELENIUM = 'selenium',
}

export interface ConfigurationAnswers extends Naming {
  config: ConfigOptions
}

export interface CustomAnswers {
  cssLibrary: CSSLibraryOptions
  componentLibrary: ComponentLibraryOptions[]
  frontendFramework: FrontendFrameworkOptions[]
  hasSVG: boolean
  hasTypescript: boolean
  testingLibraries: TestingLibraryOptions[]
  typescriptEsm?: boolean
}
