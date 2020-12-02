import { config } from './templates/config'
import Generator from 'yeoman-generator'
import { blueBright } from 'chalk'
import fs from 'fs'

const deps = ['typescript', '@stencil/core'];
const devDeps = ['wait-on', 'concurrently']



module.exports = class extends Generator {
  projectNamespace: string
  updateJason: (newJson: Record<string, any>, path: string) => void
  constructor(args: any, opts: any) {
    super(args, opts);
    this.projectNamespace = opts.projectNamespace
    this.updateJason = opts.updateJason
  }

  _overwriteStencilConfig() {
    fs.writeFileSync(
      this.destinationPath(`./${this.projectNamespace}/stencil.config.ts`),
      config()
    )
  }

  _addStencilDependencies() {
    // TODO to add support for other frameworks
    console.log(blueBright('adding stencil dependencies to the packageJson'))

    const packageJsonPath = `${this.projectNamespace}/package.json`

    const newPackageData = {
      distDirs: {
        "stencil": "dist-stencil",
        "storybook": "dist-storybook"
      },
      scripts: {
        "build": "stencil build --docs",
        "test": "stencil test --spec --e2e",
        "test.watch": "stencil test --spec --e2e --watchAll",
        "generate": "stencil generate",
        "start": "concurrently \"npm:watch-stencil\" \"npm:watch-storybook\"",
        "watch-stencil": "stencil build --dev --watch",
      },
    }

    this.updateJason(newPackageData, packageJsonPath)
    this.npmInstall(deps, {},{cwd: `${this.projectNamespace}`})
    this.npmInstall(devDeps, { 'save-dev': true }, {cwd: `${this.projectNamespace}`})
  }

  writing() {
    console.log(blueBright(`building stencil project at${process.cwd()}/${this.projectNamespace}`))
    this.spawnCommandSync('npm', [
      'init',
      'stencil',
      'component',
      `${this.projectNamespace}`
    ])

    this._addStencilDependencies()
    this._overwriteStencilConfig()
  }

};
