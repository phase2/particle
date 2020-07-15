import inquirer from 'inquirer'

import {
  CustomAnswers,
  ConfigOptions,
  ConfigurationAnswers,
  CSSLibraryOptions,
  ComponentLibraryOptions,
  FrontendFrameworkOptions,
  TestingLibraryOptions,
} from '@phase2/particle-types'

const minMaxOptionsValidate = ({ min, max }: { min: number; max?: number }) => (
  answer: Record<string, string>[]
) => {
  if (answer.length < min || (!max ? false : answer.length > max)) {
    return `You must choose a minimum of ${min} option(s)${
      max ? ` and a maximum of ${max} option(s)` : ''
    }`
  }
  return true
}

export const options: Record<string, CustomAnswers> = {
  [ConfigOptions.MODERN_REACT]: {
    cssLibrary: CSSLibraryOptions.TAILWIND,
    componentLibraryTypes: [ComponentLibraryOptions.STORYBOOK],
    frontendFramework: [FrontendFrameworkOptions.REACT],
    hasSVG: true,
    hasTypescript: true,
    testingLibraries: [TestingLibraryOptions.JEST],
    typescriptEsm: false,
  },
  [ConfigOptions.DRUPAL]: {
    cssLibrary: CSSLibraryOptions.TAILWIND,
    componentLibraryTypes: [ComponentLibraryOptions.PATTERN_LAB],
    frontendFramework: [FrontendFrameworkOptions.TWIG],
    hasSVG: true,
    hasTypescript: false, // TODO find out if there is much benefit especially if most things are TWIG centric
    testingLibraries: [
      TestingLibraryOptions.CYPRESS,
      TestingLibraryOptions.PA11Y,
    ], // How much JS are we actually using for Twig centric functions
    typescriptEsm: false,
  },
}

export const configurationPrompt = [
  {
    type: 'input',
    message: 'choose a project name using kebab case, example: "p2-project"',
    name: 'projectName',
    validate: (name: string) => {
      if (!name || name.length < 4) {
        return 'Please enter a project name of more than 4 characters length'
      }
      if (name.indexOf(' ') > 0) {
        return 'Please enter a two word project name with no spaces'
      }
      return true
    },
  },
  {
    type: 'input',
    message:
      'choose a component library name using kebab case. example "project-default"',
    name: 'componentLibraryName',
    default: 'project-default',
    validate: (name: string) => {
      if (!name || name.length < 4) {
        return 'Please enter a library name of more than 4 characters length'
      }
      return true
    },
  },
  {
    type: 'input',
    message:
      'Where does your component library exist relative to the root of the project',
    default: (answers: ConfigurationAnswers) =>
      `./source/${answers.componentLibraryName}/`,
    name: 'componentLibraryPath',
  },
  {
    type: 'list',
    message: 'Choose a configuration',
    name: 'config',
    choices: [
      {
        name:
          'modern react (storybook, tailwind, react, typescript, jest | cypress, svgs)',
        value: ConfigOptions.MODERN_REACT,
      },
      {
        name: 'drupal only (Pattern Lab, Tailwind, Svgs)',
        value: ConfigOptions.DRUPAL,
      },
      { name: 'custom', value: 'custom' },
    ],
  },
]

export const customPromptOptions = [
  {
    type: 'checkbox',
    message: 'choose a Component Library',
    name: 'componentLibraryTypes',
    choices: [
      new inquirer.Separator('-- Component Library choose(1 or both)--'),
      {
        name: 'Storybook',
        value: ComponentLibraryOptions.STORYBOOK,
        checked: true,
      },
      {
        name: 'Pattern Lab',
        value: ComponentLibraryOptions.PATTERN_LAB,
      },
    ],
    validate: minMaxOptionsValidate({ min: 1 }),
  },
  {
    type: 'checkbox',
    message: 'What frontend framework are you using with Storybook?',
    name: 'frontendFramework',
    choices: [
      {
        name: 'React',
        checked: true,
        value: FrontendFrameworkOptions.REACT,
      },
      {
        name: 'Webcomponents',
        value: FrontendFrameworkOptions.WEBCOMPONENTS,
      },
    ],
    // PR up for docs on inquirer to annotate second param answers https://github.com/SBoudrias/Inquirer.js/pull/936
    filter: (value: FrontendFrameworkOptions[], answers: CustomAnswers) => {
      if (
        answers.componentLibraryTypes.includes(
          ComponentLibraryOptions.PATTERN_LAB
        )
      ) {
        return [FrontendFrameworkOptions.TWIG, ...value]
      }
      return value
      // throw new Error(answers.componentLibrary)
      // input will { answers, values } as we are modifying the return value in the choices section
    },
    when: (answers: CustomAnswers) => {
      // Checks to see if we enabled typescript previously then asks the prompt
      if (
        new Set(answers.componentLibraryTypes).has(
          ComponentLibraryOptions.STORYBOOK
        )
      ) {
        return true
      }

      // Mutates answers object adds twig to selected choice (does not prompt user)
      answers.frontendFramework = [FrontendFrameworkOptions.TWIG]

      return false
    },
  },
  {
    type: 'list',
    message: 'Choose a CSS library',
    name: 'cssLibrary',
    choices: [
      { name: 'Tailwind', checked: true, value: CSSLibraryOptions.TAILWIND },
      { name: 'Sass', value: CSSLibraryOptions.SASS },
      {
        name: 'Bootstrap',
        disabled: true,
        value: CSSLibraryOptions.BOOTSTRAP,
      },
    ],
  },
  {
    type: 'confirm',
    message: 'Do you want to use typescript?',
    name: 'hasTypescript',
  },
  {
    type: 'confirm',
    message: 'Do you want ESModule support for typescript?',
    name: 'typescriptEsm',
    when: (answer: CustomAnswers) => {
      // Checks to see if we enabled typescript previously then asks the prompt
      if (answer.hasTypescript) {
        return true
      }
      return false
    },
  },
  {
    type: 'confirm',
    name: 'Are you using SVGs?',
  },
  {
    type: 'checkbox',
    message: 'What testing libraries do you want to use?',
    name: 'testingLibraries',
    choices: [
      { name: 'Jest', value: TestingLibraryOptions.JEST },
      { name: 'Cypress', value: TestingLibraryOptions.CYPRESS },
      { name: 'Selenium', value: TestingLibraryOptions.SELENIUM },
      {
        name: 'Loki (Storybook only VRT)',
        value: TestingLibraryOptions.LOKI,
      },
      { name: 'Pa11y', value: TestingLibraryOptions.PA11Y },
    ],
    validate: minMaxOptionsValidate({ min: 1 }),
  },
]
