import Generator from 'yeoman-generator'
import { white, green, red } from 'chalk'

// import * as p2 from '@phase2/particle-cli'
import {
  Answers,
  CSSLibraryOptions,
  ComponentLibraryOptions,
  FrontendFrameworkOptions,
  TestingLibraryOptions,
} from '../../../../common/index'

const baseDependencies = [1, 2, 3]

module.exports = class extends Generator {
  // answers: Answers = { options: { frontendFramework: 'blah' } }
  answers: Answers = {
    projectName: 'hello-world1',
    componentLibraryName: 'particle',
    componentLibraryPath: './src/default',
    options: {
      cssLibrary: CSSLibraryOptions.TAILWIND,
      componentLibraryTypes: [ComponentLibraryOptions.STORYBOOK],
      frontendFramework: [FrontendFrameworkOptions.REACT],
      hasSVG: true,
      hasTypescript: true,
      testingLibraries: [TestingLibraryOptions.JEST],
      typescriptEsm: false,
    },
  }
  // async prompting() {}

  /**
   * @todo add support for testing inputs and outputs
   */
  async createPackageJson() {
    const { frontendFramework } = this.answers.options

    console.log(this.answers)
    // console.log(p2)

    console.log(white('running npm init'))
    // await this.spawnCommandSync('npm', ['init', '-y'])

    const dependencies = [`@storybook/${frontendFramework}`]

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
    console.log(green('Success! Again!'))
  }

  // Either run npm install in current DIR or CD into the install DIR and install
  // npmInstall() {
  //   console.log('called npm install')
  // }
}
