import { config } from './templates/config'
import Generator from 'yeoman-generator'
import { blueBright, green } from 'chalk'
import fs from 'fs'

/**
* Required dev-dependencies.
*/
const devDeps = ['wait-on', 'concurrently']

module.exports = class extends Generator {
  projectNamespace: string
  updateJason: (newJson: Record<string, any>, path: string) => void
  constructor(args: any, opts: any) {
    super(args, opts);
    this.projectNamespace = opts.projectNamespace
    this.updateJason = opts.updateJason
  }

  /**
   * Replaces vanilla stencil.config.ts with templates/config.ts
   **/
  _overwriteStencilConfig() {
    console.log('overwrite stencil config')
    fs.writeFileSync(
      this.destinationPath(`./${this.projectNamespace}/stencil.config.ts`),
      config()
    )
  }

  /**
   * Update package.json and dev-dependencies
   **/
  _addStencilDependencies() {
    console.log(blueBright('adding stencil dependencies to the package.json'))

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
    this.npmInstall([...devDeps], { 'save-dev': true }, {cwd: `${this.projectNamespace}`})
  }

  /**
   * Running in default to be sure to preemptively install typescript
   * for proper storybook initialization.
  */
  default() {
    console.log(blueBright(`building stencil project at${process.cwd()}/${this.projectNamespace}`))
    this.spawnCommandSync('npm', [
      'init',
      'stencil',
      'component',
      `${this.projectNamespace}`
    ])
    console.log(green('Installing Typescript'))
    this.spawnCommandSync('npm', [
      'i',
      'typescript',
    ], {cwd: `${this.projectNamespace}`})
   this._addStencilDependencies()
   this._overwriteStencilConfig()
  }

};
