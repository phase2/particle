import inquirer from 'inquirer'

const prompt = inquirer.createPromptModule()

const genericValidate = ({ min, max }: { min: number; max?: number }) => (
  answer: Record<string, string>[]
) => {
  // if (max && answer.length > max){

  // }
  if (answer.length < min || (!max ? false : answer.length > max)) {
    return `You must choose a minimum of ${min} option(s)${
      max ? ` and a maximum of ${max} option(s)` : ''
    }`
  }
  return true
}

/**
 * Returns a promise with a json schema
 * The JSON schema will be used for the create method to generate files based off of the options selected in the prompt
 * Two ways to do this, first way is to have all options selectable, second way is to have all separated options as seperate steps.
 */
const configurationPrompt = () =>
  prompt([
    {
      type: 'checkbox',
      message: 'Choose a configuration',
      name: 'config',
      choices: ['default', 'custom'],
      validate: genericValidate({ min: 1, max: 1 }),
    },
  ])

export const generatePromptOptions = async () => {
  const results = await configurationPrompt()
  if (new Set(results.config).has('custom')) {
    return prompt([
      {
        type: 'checkbox',
        message: 'choose a design system',
        name: 'designSystem',
        choices: [
          new inquirer.Separator('-- Design System choose(1 or both)--'),
          {
            name: 'Storybook',
            checked: true,
          },
          {
            name: 'Pattern Lab',
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
        choices: ['typescript'],
      },
      {
        type: 'checkbox',
        message: 'Do you want ESModule support for typescript?',
        name: 'Typescript options',
        when: (answer) => {
          // Checks to see if we enabled typescript previously then asks the prompt
          if (new Set(answer.staticTestingLibrary).has('typescript')) {
            return true
          }
          return false
        },
        choices: [
          new inquirer.Separator(
            '-- choose(1 or both): Using both will allow for the best of both worlds but you will have to support bundling ESM for modern browsers and CJS for all other browsers --'
          ), // TODO perhaps we add this part into the message
          'typescript ESM (for modern browsers only)',
          {
            name: 'typescript CJS (all browsers but slower on modern browsers)',
            checked: true,
          },
        ],
      },
      {
        type: 'checkbox',
        message: 'What frontened framework are you using?',
        name: 'frontendFramework',
        choices: [
          { name: 'ReactJS', checked: true },
          'Twig',
          'Polymer',
          'none',
        ],
      },
      {
        type: 'checkbox',
        name: 'Are you using SVGs?',
        choices: [{ checked: true, name: 'yes' }, 'no'],
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

  return Promise.resolve(results)
}
