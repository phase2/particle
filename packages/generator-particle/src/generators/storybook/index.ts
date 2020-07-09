// import { ConfigOptions } from './../../../particle-cli/src/types' // TODO perhaps install these types separately from the module instead of the path. IE npm install -D particle-cli or @types/particle-cli
import Generator from 'yeoman-generator'
import { white, green, red } from 'chalk'

const storybookAddons: string[] = [
  '@storybook/addon-viewport',
  '@storybook/addon-knobs',
  '@storybook/addon-actions',
  '@storybook/addon-a11y',
  '@storybook/addon-links',
]

/**
 * @todo export npm dependencies directly to app and use there for install, provide an install flag to fire off npm install on completion of this generator.
 * @assumption we are already inside the particle root directory
 */
module.exports = class extends Generator {
  // comes from particle CLI answers key
  answers: { frontendFramework: string; npmInstall: boolean } = {
    frontendFramework: 'react',
    npmInstall: false,
  }
  // async prompting() {}

  /**
   * @todo add support for testing inputs and outputs
   * @todo Potentially create a helper function that moves around directories
   */
  async createStorybook() {
    const { frontendFramework } = this.answers
    const dependencies = [`@storybook/${frontendFramework}`, ...storybookAddons]

    console.log(white('installing storybook dependencies'))
    try {
      await this.spawnCommandSync('echo', ['install', '-D', ...dependencies])
    } catch (e) {
      console.log(
        red(
          `An error occured while calling npm install. 
           1. Perhaps npm is not installed correctly. Confirm by running npm --version`
        )
      )
    }
    console.log(green('Success!'))
  }

  // Either run npm install in current DIR or CD into the install DIR and install
  // npmInstall() {
  //   console.log('called npm install')
  // }
}
