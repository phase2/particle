import Generator from 'yeoman-generator'
import merge from 'lodash.merge'
import fs from 'fs'

import {
  ConfigurationAnswers
} from '@phase2/particle-types'

import {
  propOptions
} from './generatePromptOptions'

module.exports = class extends Generator {
  // configuration will come from the constructor argument
  configuration: ConfigurationAnswers
  packageJson: Record<string, any>
  cliVersion = ''

  constructor(args: any, opts: any) {
    super(args, opts)
    for (let i = 0; i < args.length; i++) {
      const value = args[i]
      const regex = /(cli-version=)(\d.*)/
      const matches = regex.exec(value)
      if (matches) {
        this.cliVersion = matches[2]
      }
    }
    // makes config a required argument
    this.option('configuration', {
      type: String,
      description: 'stringified configuration object from particle-cli'
    })

    this.configuration = opts.configuration
      ? JSON.parse(opts.configuration)
      : {}

    this.packageJson = {
      client: 'client-abbreviation',
      name: 'project-name',
      version: '1.0.0',
      main: 'index.js',
      scripts: {
        test: 'echo "Error: no test specified" && exit 1'
      },
      keywords: [],
      author: '',
      license: 'ISC',
      description: 'Particle boilerplate project',
      repository: {},
      dependencies: {},
      devDependencies: {}
    }
    this._updatePackageJson = this._updatePackageJson.bind(this)
  }

  _updatePackageJson(newValues: Record<string, any>) {
    this.packageJson = merge(this.packageJson, newValues)
  }

  /**
   *  Helper function passed to sub-generators
   */
  _updateSubGeneratorPackageJson(newValues: Record<string, any>, jsonPath: string) :void {
    const currentJson = JSON.parse(fs.readFileSync(jsonPath).toString());
    const mergedJson = JSON.stringify(merge(currentJson, newValues))

    fs.writeFileSync(jsonPath, mergedJson )
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
   * Create a particle config file
   */

  async _writeParticleConfig() {
    fs.writeFileSync(
      '.particlerc',
      JSON.stringify(
        { ...{ 'cli-version': this.cliVersion }, ...this.configuration },
        null,
        2
      )
    )
  }

  async _promptUser() {
    this.configuration.config = await this.prompt(propOptions)
    this.packageJson.client = this.configuration.config.nameSpace
    this.packageJson.name = this.configuration.config.projectName
  }

  /**
   * Initializes all sub:generators that have been opted in
   */
  async initializing() {
    await this._promptUser()
    const { nameSpace, projectName } = this.configuration.config
    const projectNamespace = `${nameSpace}-${projectName}`

    // All composed generators must be imported following this syntax https://yeoman.io/authoring/composability.html

    this.composeWith(
      require.resolve('@phase2/generator-particle-components'),
      {
        projectNamespace: projectNamespace,
        updateJason: this._updateSubGeneratorPackageJson
      }
    );

    this.composeWith(
      require.resolve('@phase2/generator-particle-storybook'),
      {
        projectNamespace: projectNamespace,
        updateJason: this._updateSubGeneratorPackageJson
      }
    );
  }
  // Add other subgenerators here

  configuring() {
    this._createPackageJson()
    this._writeParticleConfig()
  }
}
