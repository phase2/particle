import Generator from 'yeoman-generator'
import { white, green, red } from 'chalk'
import merge from 'lodash.merge'
import fs from 'fs'

import {
  Answers,
  CSSLibraryOptions,
  ComponentLibraryOptions,
  FrontendFrameworkOptions,
  TestingLibraryOptions,
} from '../../../../common'

const baseDependencies = [1, 2, 3]

module.exports = class extends Generator {
  // configuration will come from the constructor argument
  configuration: Answers
  packageJson: Record<string, any>

  constructor(args: any, opts: any) {
    super(args, opts)
    this.configuration = opts.configuration || {
      projectName: 'new-project',
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

    this.packageJson = {
      name: this.configuration.projectName,
      version: '1.0.0',
      main: 'index.js',
      scripts: {
        test: 'echo "Error: no test specified" && exit 1',
      },
      keywords: [],
      author: '',
      license: 'ISC',
      description: '',
      dependencies: {},
      devDependencies: {},
    }

    this._updatePackageJson = this._updatePackageJson.bind(this)
  }

  _updatePackageJson(newValues: Record<string, any>) {
    console.log('called package json update with', newValues)
    this.packageJson = merge(this.packageJson, newValues)
    console.log(this.packageJson)
  }
  // async prompting() {}

  initializing() {
    this.composeWith('@phase2/particle:storybook', {
      configuration: this.configuration,
      updatePackageJson: this._updatePackageJson,
    })
  }

  writing() {
    console.log('hello world', this.packageJson)
  }

  /**
   * @todo add support for testing inputs and outputs
   */
  // async createPackageJsonConfig() {
  //   // Call N number of generators that mutate the package.json
  //   console.log('calling storybook generator')
  // this.composeWith('@phase2/particle:storybook', {
  //   configuration: this.configuration,
  //   updatePackageJson: this._updatePackageJson,
  // })

  //   console.log('new package', this.packageJson)

  //   // Write the packageJson
  //   // const packageJsonContent = this.fs.readJSON(
  //   //   this.destinationPath('package.json')
  //   // )

  //   // const newPackageJsonContent = merge(packageJsonContent, packageJson)

  //   // write package.json once
  // }

  /**
   * Creates the package.json, package.json should never need to be re-written
   */
  // createPackageJson() {
  //   console.log('newJSON', this.packageJson)
  //   fs.writeFileSync(
  //     this.destinationPath('package.json'),
  //     JSON.stringify(this.packageJson, null, 2)
  //   )
  // }

  // NPM install should be called after all dependencies are written to the package.json
  // Retain for debugging and disable for production
  async npmInstall(dependencies: string[], options: Record<string, any>) {
    // console.log(dependencies, options)
    // await this.spawnCommandSync('npm', ['install'])
  }
}
