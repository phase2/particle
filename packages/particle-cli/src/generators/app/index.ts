import Generator from 'yeoman-generator'
import merge from 'lodash.merge'
import fs from 'fs'
import path from 'path'

import {
  Answers,
  ConfigurationAnswers,
  ConfigOptions,
  FrontendFrameworkOptions,
} from '@phase2/particle-types'

import {
  configurationPrompt,
  customPromptOptions,
  options as configOptions,
} from './generatePromptOptions'

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

    this.packageJson = {
      name: 'project-name',
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

  async _promptUser() {
    // Initialize storybook
    const results: ConfigurationAnswers = await this.prompt(configurationPrompt)

    // if custom exit here
    if (results.config === ConfigOptions.CUSTOM) {
      const customOptions = await this.prompt(customPromptOptions)

      this.configuration = {
        ...results,
        options: customOptions,
      }
    } else {
      this.configuration = {
        ...results,
        options: configOptions[results.config],
      }
    }

    this.packageJson.name = results.projectName
  }

  /**
   * Initializes all sub:generators that have been opted in
   */
  async initializing() {
    this._promptUser()

    // All composed generators must be resolved through path to work properly for local generators
    if (
      this.configuration.options.frontendFramework.includes(
        FrontendFrameworkOptions.REACT
      )
    ) {
      this.composeWith(path.resolve(__dirname, '../storybook'), {
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
