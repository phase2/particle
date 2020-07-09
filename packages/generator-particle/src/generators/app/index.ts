// import { ConfigOptions } from './../../../particle-cli/src/types' // TODO perhaps install these types separately from the module instead of the path. IE npm install -D particle-cli or @types/particle-cli
import Generator from 'yeoman-generator'
import { white, green, red } from 'chalk'

const baseDependencies = []

module.exports = class extends Generator {
  answers: { frontendFramework: string } = {
    frontendFramework: 'react', // comes from particle CLI
  }
  // async prompting() {}

  /**
   * @todo add support for testing inputs and outputs
   */
  async createPackageJson() {
    const { frontendFramework } = this.answers

    console.log(white('running npm init'))
    await this.spawnCommandSync('npm', ['init', '-y'])

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
    console.log(green('Success!'))
  }

  // Either run npm install in current DIR or CD into the install DIR and install
  // npmInstall() {
  //   console.log('called npm install')
  // }
}
