import inquirer from 'inquirer'

import {
  CustomAnswers,
  FrontendFrameworkOptions,
  TestingLibraryOptions,
  DesignTheme,
} from '@phase2/particle-types'

const minMaxOptionsValidate = ({ min, max }: { min: number; max?: number }) => (
  answer: Record<string, string>[]
) => {
  if (answer.length < min || (!max ? false : answer.length > max)) {
    return `You must choose a minimum of ${min} option(s)${
      max ? ` and a maximum of ${max} option(s).` : ''
    }`
  }
  return true
}

export const designThemePrompt = () => [
  {
    type: 'list',
    message: 'What frontend framework are you using with Storybook?',
    name: 'frontendFramework',
    choices: [
      {
        name: 'Webcomponents',
        checked: true,
        value: FrontendFrameworkOptions.WEBCOMPONENTS
      },
      {
        name: 'React',
        value: FrontendFrameworkOptions.REACT
      }
    ],
  },
  {
    type: 'input',
    message: 'Choose a design theme name using kebab case. (min 4 chars) Ex: "alpha".',
    name: 'themeName',
    default: 'default',
    validate: (name: string) => {
      if (!name || name.length < 4) {
        return 'Please enter a project name of more than 4 characters length'
      }
      if (name.indexOf(' ') > 0) {
        return 'Please enter a two word project name with no spaces'
      }
      return true
    }
  },
  {
    type: 'input',
    message:
      'Where does your design theme exist relative to the root of the project',
    default: (answers: DesignTheme) =>
      `./source/design/${answers.themeName}/`,
    name: 'themePath'
  }
]

const compileThemes = async (prev: DesignTheme[]) => {
  return [...prev, await inquirer.prompt(designThemePrompt())]
}

const rerun = [{
  type: 'confirm',
  name: 'generateTheme',
  message: 'Do you want to add another theme?',
  default: true
}]

export const generatorLoop = async() => {
  let loop = true;
  let themesArray:DesignTheme[] = []
  do {
      themesArray = await compileThemes(themesArray)
      loop = await inquirer.prompt(rerun).then(answers => answers.generateTheme)
    } while (loop)

  return themesArray;
}

export const propOptions = [
  {
    type: 'input',
    message: 'Choose a abbreviation for your/client\'s name. (min 3 chars)',
    name: 'clientAbbreviation',
    validate: (name: string) => {
      if (!name || name.length < 3) {
        return 'Please enter a project name of more than 4 characters length.'
      }
      if (name.indexOf(' ') > 0) {
        return 'Please enter a two word project name with no spaces.'
      }
      return true
    }
  },
  {
    type: 'input',
    message: 'Choose a name for the overall project using kebab case. (min 4 chars) Ex: "website", or "saphire-dagger"',
    name: 'projectName',
    validate: (name: string) => {
      if (!name || name.length < 4) {
        return 'Please enter a project name of more than 4 characters length.'
      }
      if (name.indexOf(' ') > 0) {
        return 'Please enter a two word project name with no spaces.'
      }
      return true
    },
  },
  {
    type: 'confirm',
    message: 'Will you be using Drupal?',
    name: 'hasDrupal',
    default: false,
  },
  {
    type: 'input',
    message: 'Where should your Drupal root exist?',
    default: `./source/drupal/`,
    name: 'drupalRootPath',
    when: (answer: CustomAnswers) => {
     return answer.hasDrupal
    }
  },
  {
    type: 'confirm',
    message: 'Do you want to use typescript?',
    name: 'hasTypescript'
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
    }
  },
  {
    type: 'confirm',
    name: 'Are you using SVGs?'
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
        value: TestingLibraryOptions.LOKI
      },
      { name: 'Pa11y', value: TestingLibraryOptions.PA11Y }
    ],
    validate: minMaxOptionsValidate({ min: 1 })
  }
]
