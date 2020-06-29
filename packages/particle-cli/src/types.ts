export enum CSSLibraryOptions {
  TAILWIND = 'tailwind',
  BOOTSTRAP = 'bootstrap',
}

export enum DesignSystemPatternLibraryOptions {
  STORYBOOK = 'storybook',
  PATTERN_LAB = 'pattern_lab',
}

export enum StaticTestingLibraryOptions {
  TYPESCRIPT = 'typescript',
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

export interface ConfigurationAnswers extends Naming {
  config: ConfigOptions
}

export interface CustomAnswers {
  designSystem: DesignSystemPatternLibraryOptions[]
  frontendFramework: FrontendFrameworkOptions[]
  staticTestingLibrary: StaticTestingLibraryOptions[]
}
