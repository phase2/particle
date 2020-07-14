import Generator from 'yeoman-generator'
import merge from 'lodash.merge'
import fs from 'fs'

import {
  Answers,
  CSSLibraryOptions,
  ComponentLibraryOptions,
  FrontendFrameworkOptions,
  TestingLibraryOptions,
} from '@phase2/particle-types'

module.exports = class extends Generator {
  // configuration will come from the constructor argument
  configuration: Answers
  packageJson: Record<string, any>

  constructor(args: any, opts: any) {
    super(args, opts)
    // makes config a required argument
    this.option('configuration', {
      type: String,
      description: 'stringified configuration from particle-cli',
    })

    if (typeof opts.configuration === 'string') {
      this.configuration = JSON.parse(opts.configuration)
    } else {
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
    this.packageJson = merge(this.packageJson, newValues)
  }

  /**
   * Creates the package.json, package.json should never need to be re-written
   */
  _createPackageJson() {
    fs.writeFileSync(
      this.destinationPath('package.json'),
      JSON.stringify(this.packageJson, null, 2)
    )
  }

  /**
   * Initializes all sub:generators that have been opted in
   */
  initializing() {
    // Initialize storybook
    if (
      this.configuration.options.frontendFramework.includes(
        FrontendFrameworkOptions.REACT
      )
    ) {
      this.composeWith('@phase2/particle:storybook', {
        configuration: this.configuration,
        updatePackageJson: this._updatePackageJson,
      })
    }

    // Add other subgenerators here
  }

  writing() {
    this._createPackageJson()

    // Installs all dependencies
    this.npmInstall()
  }
}
