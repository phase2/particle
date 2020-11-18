import inquirer from 'inquirer';
import chalk from 'chalk';

import {
  CustomAnswers,
  FrontendFrameworkOptions,
  TestingLibraryOptions,
  Bundle,
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

const validateString = (length: number, defaultVal?:string ) => (
  answer: string
) => {
  const defaultText = defaultVal ? `\n Recommended: ${defaultVal}` : ''
  if (!answer || answer.length < length) {
    return `Please enter a value of at least ${length} characters length.${defaultText}`
  }
  if (answer.indexOf(' ') > 0) {
    return 'Please enter a value name with no spaces'
  }
  return true
}

const nameWork = [
  {
    type: 'input',
    message:'Enter a component library name using kebab case. (min 4 chars) Ex: "alpha".',
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
]

const dists = (designRoot: string, usingDrupal: boolean, name: string) => [
  {
    type: 'input',
    message: `Where does ${chalk.blue(name)}\'s storybook compile to?`,
    name: 'storybook',
    default:`${designRoot}/${name}/dist/`,
    validate: validateString(5)
  },
  {
    type: 'input',
    message: `Where should Drupal compile ${chalk.blue(name)} to?`,
    default: './themes/particle/dist/',
    name: 'drupal',
    validate: validateString(5),
    when: usingDrupal
  }
]

const generateBundle = async (prev: Bundle[], root: string, usingDrupal: boolean) => {
  const {name, frontendFramework } = await inquirer.prompt(nameWork)
  const { storybook, drupal } = await inquirer.prompt(dists(root, usingDrupal, name))
  if (drupal) {
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
    validate: validateString(2)
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
    default: './project/design',
    validate: validateString(5, './project/design')
  },
  {
    type: 'confirm',
    message: 'Will you be using Drupal?',
    name: 'hasDrupal',
    default: true
  },
  {
    type: 'input',
    message: 'Where should your Drupal root exist?',
    default: `./project/`,
    name: 'drupal',
    when: (answer: CustomAnswers) => {
      return answer.hasDrupal
    },
    validate: validateString(5,`./project/`)
  },
  {
    type: 'checkbox',
    message: 'What testing libraries do you want to use?',
    name: 'testingLibraries',
    choices: [
      { name: 'Jest', value: TestingLibraryOptions.JEST },
      { name: 'Cypress', value: TestingLibraryOptions.CYPRESS },
    ],
    validate: minMaxOptionsValidate({ min: 1 })
  }
]
