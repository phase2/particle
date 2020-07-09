declare module '@phase2/particle-cli' {
  enum CSSLibraryOptions {
    TAILWIND = 'tailwind',
    SASS = 'sass',
    BOOTSTRAP = 'bootstrap',
  }
  enum ComponentLibraryOptions {
    STORYBOOK = 'storybook',
    PATTERN_LAB = 'pattern_lab',
  }
  enum FrontendFrameworkOptions {
    TWIG = 'twig',
    REACT = 'react',
    WEBCOMPONENTS = 'webcomponents',
  }
  enum ConfigOptions {
    MODERN_REACT = 'modern_react',
    DRUPAL = 'drupal',
    CUSTOM = 'custom',
  }
  enum TestingLibraryOptions {
    CYPRESS = 'cypress',
    JEST = 'jest',
    LOKI = 'loki',
    PA11Y = 'pa11y',
    SELENIUM = 'selenium',
  }
  interface Naming {
    projectName: string
    componentLibraryName: string
    componentLibraryPath: string
  }

  interface ConfigurationAnswers extends Naming {
    config: ConfigOptions
  }

  interface CustomAnswers {
    cssLibrary: CSSLibraryOptions
    componentLibraryTypes: ComponentLibraryOptions[]
    frontendFramework: FrontendFrameworkOptions[]
    hasSVG: boolean
    hasTypescript: boolean
    testingLibraries: TestingLibraryOptions[]
    typescriptEsm?: boolean
  }

  interface Answers extends Naming {
    options: CustomAnswers
  }
}
