import Generator from 'yeoman-generator'
import { white, green, red } from 'chalk'

import { Answers } from './../../../../common'

const storybookAddons: string[] = [
  '@storybook/addon-viewport',
  '@storybook/addon-knobs',
  '@storybook/addon-actions',
  '@storybook/addon-a11y',
  '@storybook/addon-links',
]

const storybookSupportedVersion = '^5.3.19'

/**
 * @todo export npm dependencies directly to app and use there for install, provide an install flag to fire off npm install on completion of this generator.
 * @assumption we are already inside the particle root directory
 */
module.exports = class extends Generator {
  configuration: Answers
  updatePackageJson: (newJson: Record<string, any>) => void
  constructor(args: any, opts: any) {
    super(args, opts)
    this.configuration = opts.configuration
    this.updatePackageJson = opts.updatePackageJson

    console.log(this.updatePackageJson)
  }
  // async prompting() {}

  /**
   * @todo add support for testing inputs and outputs
   * @todo Potentially create a helper function that moves around directories
   */
  async createStorybook() {
    this.updatePackageJson({ name: 'hello world' })
    const { frontendFramework } = this.configuration.options
    const dependencies = [`@storybook/${frontendFramework}`, ...storybookAddons]

    console.log(white('installing storybook dependencies'))

    try {
      // This will add the storybook dependencies and supported version directly onto the package.json
      // this.fs.extendJSON('./package.json', {
      //   scripts: {
      //     'build:storybook': 'build-storybook -c ./apps/storybook',
      //     'dev:storybook': 'start-storybook -p 6006 -c ./apps/storybook',
      //   },
      //   devDependencies: dependencies.reduce<Record<string, string>>(
      //     (acc, value) => {
      //       acc[value] = storybookSupportedVersion
      //       return acc
      //     },
      //     {}
      //   ),
      // })
    } catch (e) {
      console.log(
        red(
          `An error occured while writting storybook dependencies to the package.json`
        )
      )
    }
    console.log('done')
  }
}
