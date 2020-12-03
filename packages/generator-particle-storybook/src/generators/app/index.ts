import { preview } from './templates/preview'
import { component } from './templates/test-component'
import Generator from 'yeoman-generator'
import { green } from 'chalk'
import fs from 'fs'

import { main } from './templates/main'

export const storybookAddons: string[] = [
  '@storybook/addon-knobs',
  '@storybook/addon-actions',
  '@storybook/addon-links',
  '@storybook/addon-viewport',
  '@storybook/addon-a11y',
  '@storybook/preset-typescript',
  '@storybook/web-components'
]

const storiesRoot: string[] = ['../src/**/*.stories.tsx']

/**
 * @assumption we are already inside the particle root directory
 * Currently only supports react
 */
module.exports = class extends Generator {
  projectNamespace: string
  updateJason: (newJson: Record<string, any>, path: string) => void

  constructor(args: any, opts: any) {
    super(args, opts)
    this.projectNamespace = opts.projectNamespace
    this.updateJason = opts.updateJason
  }


  /**
   * Update package.json scripts
  */
  _addStorybookDependencies() {
    // TODO to add support for other frameworks
    console.log(green('adding storybook dependencies to the package.json'))
    const packageJsonPath = `${this.projectNamespace}/package.json`

    const newPackageData = {
      scripts: {
        'build:storybook': 'build-storybook -c ./apps/storybook',
        'dev:storybook': 'start-storybook -p 6006 -c ./apps/storybook',
        "watch-storybook": "wait-on ./dist-stencil && start-storybook -p 6009",
      }
    }

    this.updateJason(newPackageData, packageJsonPath);
    this.npmInstall([...storybookAddons], { 'save-dev': true }, {cwd: this.projectNamespace})
  }

  writing() {
    const isStencil = fs.existsSync(this.projectNamespace);
    const storybookPath = `${this.projectNamespace}/.storybook`

    console.log(green('creating files & folders for storybook'))

    // create the folders
    fs.mkdirSync(`${process.cwd()}/${this.projectNamespace}/`, {recursive: true})

    this.spawnCommandSync(
      'npx',
      ['-p', '@storybook/cli', 'sb', 'init', '-t', 'web_components'],
      { cwd: `${this.projectNamespace}` })

    // remove extraneous stories dir.
    if (isStencil) {
      this.spawnCommandSync(
        'rm',
        ['-rf', 'stories'],
        {cwd: `${this.projectNamespace}/src`}
        )
    }

    // overwrite boilerplate config files.
    fs.writeFileSync(
      this.destinationPath(`${storybookPath}/main.js`),
      main({
        addons: [...storybookAddons],
        storiesRoot
      })
    )
    fs.writeFileSync(
      this.destinationPath(`${storybookPath}/preview.js`),
      preview()
    )
    fs.openSync(`${this.projectNamespace}/src/components/my-component/my-component.stories.tsx`, 'w')
    fs.writeFileSync(
      this.destinationPath(`${this.projectNamespace}/src/components/my-component/my-component.stories.tsx`),
      component()
    )
    this._addStorybookDependencies()
  }
}
