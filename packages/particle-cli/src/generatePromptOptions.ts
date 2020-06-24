import {
  DesignSystemPatternLibraryOptions,
  StaticTestingLibraryOptions,
} from './types'
import inquirer from 'inquirer'

const prompt = inquirer.createPromptModule()

const genericValidate = ({ min, max }: { min: number; max?: number }) => (
  answer: Record<string, string>[]
) => {
  if (answer.length < min || (!max ? false : answer.length > max)) {
    return `You must choose a minimum of ${min} option(s)${
      max ? ` and a maximum of ${max} option(s)` : ''
    }`
  }
  return true
}

const configurationPrompt = () =>
  prompt([
    {
      type: 'input',
      message: 'choose a repo name',
      name: 'repoName',
      validate: (name: string) => {
        if (!name || name.length < 4) {
          return 'Please enter a repo name of more than 4 characters length'
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
      type: 'checkbox',
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
      validate: genericValidate({ min: 1, max: 1 }),
    },
  ])

const customPromptOptions = () => {
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
      validate: genericValidate({ min: 1 }),
    },
    {
      type: 'checkbox',
      message: 'Choose a CSS library',
      name: 'cssLibrary',
      choices: [
        { name: 'Tailwind', checked: true },
        'Sass',
        { name: 'bootstrap', disabled: true },
      ],
    },
    {
      type: 'checkbox',
      message: '[optional] choose a static typing library',
      name: 'staticTestingLibrary',
      choices: [StaticTestingLibraryOptions.TYPESCRIPT],
    },
    {
      type: 'checkbox',
      message:
        'Do you want ESModule support for typescript? \n -- choose(1 or both): Using both will allow for the best of both worlds but you will have to support bundling ESM for modern browsers and CJS for all other browsers --',
      name: 'Typescript options',
      when: (answer) => {
        // Checks to see if we enabled typescript previously then asks the prompt
        if (
          new Set(answer.staticTestingLibrary).has(
            StaticTestingLibraryOptions.TYPESCRIPT
          )
        ) {
          return true
        }
        return false
      },
      choices: [
        new inquirer.Separator(
          '-- choose(1 or both): Using both will allow for the best of both worlds but you will have to support bundling ESM for modern browsers and CJS for all other browsers --'
        ), // TODO perhaps we add this part into the message
        {
          name: 'typescript CJS (all browsers but slower on modern browsers)',
          value: 'cjs',
          checked: true,
        },
        { name: 'typescript ESM (for modern browsers only)', value: 'esm' },
      ],
    },
    {
      type: 'checkbox',
      message: 'What frontened framework are you using?',
      name: 'frontendFramework',
      choices: [{ name: 'ReactJS', checked: true }, 'Twig', 'Polymer', 'none'],
    },
    {
      type: 'checkbox',
      name: 'Are you using SVGs?',
      choices: [
        { checked: true, name: 'yes', value: true },
        { name: 'no', value: false },
      ],
      validate: genericValidate({ min: 1, max: 1 }),
    },
    {
      type: 'checkbox',
      message: 'What testing libraries do you want to use?',
      name: 'testingLibraries',
      choices: ['Jest', 'Cypress', 'Loki (Storybook only VRT)'],
      validate: genericValidate({ min: 1 }),
    },
  ])
}

/**
 * Returns a promise with a json schema
 * The JSON schema will be used for the create method to generate files based off of the options selected in the prompt
 */
export const generatePromptOptions = async () => {
  const results = await configurationPrompt()
  if (new Set(results.config).has('custom')) {
    return customPromptOptions()
  }

  return Promise.resolve(results)
}
