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
]
