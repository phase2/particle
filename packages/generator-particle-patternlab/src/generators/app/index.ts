import Generator from 'yeoman-generator'
import fs from 'fs'
import _ from 'lodash'

const plVersion = '^5.7.1'

const plDependencies = {
  '@pattern-lab/cli': plVersion,
  '@pattern-lab/core': plVersion,
  '@pattern-lab/engine-twig-php': plVersion,
  '@pattern-lab/uikit-workshop': plVersion,
  '@pattern-lab/starterkit-twig-demo': plVersion,
}

const plScripts = {
  'pl:build':
    'patternlab build --config ./node_modules/@pattern-lab/starterkit-twig-demo/patternlab-config.json',
  'pl:help': 'patternlab --help',
  'pl:install':
    'patternlab install --config ./node_modules/@pattern-lab/starterkit-twig-demo/patternlab-config.json',
  'pl:serve':
    'patternlab serve --config ./node_modules/@pattern-lab/starterkit-twig-demo/patternlab-config.json',
  'pl:version': 'patternlab --version',
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    console.log('Initializing')
  }
  async configuring() {
    const pkgJson = await this.fs.readJSON('./package.json')
    _.merge(pkgJson.dependencies, plDependencies)
    _.merge(pkgJson.scripts, plScripts)
    console.log(pkgJson)
    this.fs.writeJSON('./package.json', JSON.stringify(pkgJson, null, 2))
  }
  async writing() {
    console.log('Writing', this.templatePath())
    this.fs.copy(this.templatePath('source'), this.destinationPath('source'))
  }
  async install() {
    this.npmInstall()
  }

  async end() {
    console.log('Finishing up')
  }
}
