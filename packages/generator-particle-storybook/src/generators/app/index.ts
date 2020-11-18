import { preview } from './templates/preview'
import Generator from 'yeoman-generator'
import { white } from 'chalk'
import fs from 'fs'

import {
  FrontendFrameworkOptions,
  StorybookConfig,
} from '@phase2/particle-types'
import { main } from './templates/main'

export const storybookAddons: string[] = [
  '@storybook/addon-knobs',
  '@storybook/addon-actions',
  '@storybook/addon-links',
  '@storybook/addon-viewport',
  '@storybook/addon-a11y',
  '@storybook/preset-typescript'
]

const storybookSupportedVersion = '^5.3.19'
const storybookPath = 'app/storybook'
const storiesRoot: string[] = ['./stories/**/*.story.tsx']

/**
 * @assumption we are already inside the particle root directory
 * Currently only supports react
 */
module.exports = class extends Generator {
  configuration: StorybookConfig
  updatePackageJson: (newJson: Record<string, any>) => void
  constructor(args: any, opts: any) {
    super(args, opts)
    this.configuration = opts.configuration
    this.updatePackageJson = opts.updatePackageJson
  }

  addStorybookDependencies() {
    // TODO to add support for other frameworks
    const dependencies = ['@storybook/react', ...storybookAddons]

    console.log(white('adding storybook dependencies to the packageJson'))

    // if noInstall flag is passed assume that updatePackageJson was passed and fire off command
    // else run npm install
    this.updatePackageJson({
      scripts: {
        'build:storybook': 'build-storybook -c ./apps/storybook',
        'dev:storybook': 'start-storybook -p 6006 -c ./apps/storybook',
      },
      devDependencies: dependencies.reduce<Record<string, string>>(
        (acc, value: string) => {
          acc[value] = storybookSupportedVersion
          return acc
        },
        {}
      ),
    })
  }

  async createStorybookFiles() {
    console.log(white('creating files & folders for storybook'))

    // create the folders
    fs.mkdirSync(`${process.cwd()}/${storybookPath}/`, { recursive: true })

    // create the files
    fs.writeFileSync(
      this.destinationPath(`${storybookPath}/main.js`),
      main({
        addons: storybookAddons,
        componentLibraryPath: `../../${this.configuration.root}/${this.configuration.name}`,
        storiesRoot,
      })
    )
    fs.writeFileSync(
      this.destinationPath(`${storybookPath}/preview.js`),
      preview({
        frontendFramework: FrontendFrameworkOptions.REACT,
      })
    )
  }
}
