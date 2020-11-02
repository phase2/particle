import inquirer from 'inquirer'

import {
  CustomAnswers,
  FrontendFrameworkOptions,
  TestingLibraryOptions,
  Bundle,
  BundleAnswers
} from '@phase2/particle-types'

const minMaxOptionsValidate = ({ min, max }: { min: number; max?: number }) => (
  answer: Record<string, string>[]
) => {
  if (answer.length < min || (!max ? false : answer.length > max)) {
    const maxText = max? `and a maximum of ${max} options.` : ' option(s).'
    return `You must choose a minimum of ${min}${maxText}`
  }
  return true
}

const validateString = (length: number) => (
  answer: string
) => {
  if (!answer || answer.length < length) {
    return `Please enter a name of at least ${length} characters length`
  }
  if (answer.indexOf(' ') > 0) {
    return 'Please enter a two word name with no spaces'
  }
  return true
}

export const bundlePrompt = (designRoot: string, usingDrupal: boolean) =>
[
    {
      type: 'input',
      message: 'Choose a design theme name using kebab case. (min 4 chars) Ex: "alpha".',
      name: 'name',
      default: 'default',
      validate: validateString(4)
    },
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
      ]
    },
    {
      type: 'input',
      message: 'Where does this theme\'s storybook compile to?',
      name: 'storybook',
      default: (answers: BundleAnswers) =>
        `${designRoot}/${answers.name}/dist/`
    },
    {
      type: 'confirm',
      message: 'Will Drupal use this theme?',
      name: 'consuming',
      default: true,
      when: usingDrupal
    },
    {
      type: 'input',
      message: 'Where should your Drupal theme compile to?',
      default: `./themes/particle/dist/`,
      name: 'drupal',
      when: (answers: BundleAnswers) => {
        return answers.consuming
      }
    }
  ]

const generateBundle = async (prev: Bundle[], root: string, usingDrupal: boolean) => {
  const res: BundleAnswers = await inquirer.prompt(bundlePrompt(root, usingDrupal))
  const { frontendFramework, consuming, name, storybook, drupal } = res
  if (consuming) {
    const curr: Bundle = {
      name: name,
      frontendFramework: frontendFramework,
      storybook: {
        dist: storybook
      },
      drupal: {
        dist: drupal
      }
    }
    return [...prev, curr]

  }
  const curr: Bundle = {
    name: name,
    frontendFramework: frontendFramework,
    storybook: {
      dist: storybook
    }
  }

  return [...prev, curr]
}

export const bundleLoop = async (designRoot: string, hasDrupal: boolean) => {
  let loop = true
  let bundlesArray: any[] = [{name: 'base'}]
  const rerun = [{
    type: 'confirm',
    name: 'generateTheme',
    message: 'Do you want to add another theme?',
    default: true
  }]
  do {
    bundlesArray = await generateBundle(bundlesArray, designRoot, hasDrupal)
    loop = await inquirer.prompt(rerun).then(answers => answers.generateTheme)
  } while (loop)

  return bundlesArray
}

export const propOptions = [
  {
    type: 'input',
    message: 'Choose a abbreviation for your/client\'s name. (min 3 chars)',
    name: 'nameSpace',
    validate: validateString(3)
  },
  {
    type: 'input',
    message: 'Choose a name for the overall project using kebab case. (min 4 chars) Ex: "website", or "saphire-dagger"',
    name: 'projectName',
    validate: validateString(4)
  },
  {
    type: 'input',
    message: 'Where would you like to place your design system?',
    name: 'designRoot',
    default: './project/frontend'
  },
  {
    type: 'confirm',
    message: 'Will you be using Drupal?',
    name: 'hasDrupal',
    default: false
  },
  {
    type: 'input',
    message: 'Where should your Drupal root exist?',
    default: `./drupal/`,
    name: 'drupal',
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
