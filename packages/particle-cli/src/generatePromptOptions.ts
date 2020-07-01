import {
  CustomAnswers,
  ConfigOptions,
  ConfigurationAnswers,
  CSSLibraryOptions,
  DesignSystemPatternLibraryOptions,
  FrontendFrameworkOptions,
  TestingLibraryOptions,
} from './types'
import inquirer from 'inquirer'

const prompt = inquirer.createPromptModule()

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

const configurationPrompt = (): Promise<ConfigurationAnswers> =>
  prompt([
    {
      type: 'input',
      message: 'choose a project name using kebab case, example: "my-project"',
      name: 'projectName',
      validate: (name: string) => {
        if (!name || name.length < 4) {
          return 'Please enter a project name of more than 4 characters length'
        }
        if (name.indexOf(' ') > 0) {
          return 'Please enter a project name with no spaces'
        }
        return true
      },
    },
    {
      type: 'input',
      message: 'choose a design system name',
      name: 'designSystemName',
      default: 'default',
      validate: (name: string) => {
        if (!name || name.length < 4) {
          return 'Please enter a repo name of more than 4 characters length'
        }
        return true
      },
    },
    {
      type: 'list',
      message: 'Choose a configuration',
      name: 'config',
      choices: [
        {
          name:
            'modern react (storybook, tailwind, react, typescript, jest | cypress, svgs)',
          value: 'modern-react',
        },
        { name: 'drupal only (Pattern Lab, Tailwind, Svgs)', value: 'drupal' },
        { name: 'custom', value: 'custom' },
      ],
    },
  ])

const customPromptOptions = (): Promise<CustomAnswers> => {
  return prompt([
    {
      type: 'checkbox',
      message: 'choose a Component/Pattern Library or a Design System',
      name: 'designSystem',
      choices: [
        new inquirer.Separator('-- Design System choose(1 or both)--'),
        {
          name: 'Storybook',
          value: DesignSystemPatternLibraryOptions.STORYBOOK,
          checked: true,
        },
        {
          name: 'Pattern Lab',
          value: DesignSystemPatternLibraryOptions.PATTERN_LAB,
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
          answers.designSystem.includes(
            DesignSystemPatternLibraryOptions.PATTERN_LAB
          )
        ) {
          return [FrontendFrameworkOptions.TWIG, ...value]
        }
        return value
        // throw new Error(answers.designSystem)
        // input will { answers, values } as we are modifying the return value in the choices section
      },
      when: (answers: CustomAnswers) => {
        // Checks to see if we enabled typescript previously then asks the prompt
        if (
          new Set(answers.designSystem).has(
            DesignSystemPatternLibraryOptions.STORYBOOK
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
      ],
      validate: minMaxOptionsValidate({ min: 1 }),
    },
  ])
}

/**
 * Returns a promise with a json schema
 * The JSON schema will be used for the create method to generate files based off of the options selected in the prompt
 */
export const generatePromptOptions = async () => {
  const results = await configurationPrompt()
  if (results.config === ConfigOptions.CUSTOM) {
    return customPromptOptions()
  }

  return Promise.resolve(results)
}
