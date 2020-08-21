import Generator from 'yeoman-generator'
import merge from 'lodash.merge'
var mkdirp = require('mkdirp')
// import fs from 'fs'

import { Answers, FrontendFrameworkOptions } from '@phase2/particle-types'
import { main } from './templates/main'

type FrontendOptionsMap = { [key in FrontendFrameworkOptions]: string }

interface LooseObject {
  [key: string]: any
}

const sbVersion = '^5.3.19'
export const storybookAddons = [
  {
    name: 'knobs',
    dependency: { '@storybook/addon-knobs': sbVersion },
    checked: true,
  },
  {
    name: 'actions',
    dependency: { '@storybook/addon-actions': sbVersion },
    checked: true,
  },
  {
    name: 'links',
    dependency: { '@storybook/addon-links': sbVersion },
    checked: true,
  },
  {
    name: 'viewport',
    dependency: { '@storybook/addon-viewport': sbVersion },
    checked: true,
  },
  {
    name: 'a11y',
    dependency: { '@storybook/addon-a11y': sbVersion },
    checked: true,
  },
  {
    name: 'docs',
    dependency: { '@storybook/addon-docs': sbVersion },
    checked: true,
  },
  {
    name: 'backgrounds',
    dependency: { '@storybook/addon-backgrounds': sbVersion },
    checked: true,
  },
]

const storybookPath = 'app/storybook'

const FrontendOptions: FrontendOptionsMap = {
  [FrontendFrameworkOptions.REACT]: '@storybook/react',
  [FrontendFrameworkOptions.WEBCOMPONENTS]: '@storybook/web-components',
  [FrontendFrameworkOptions.TWIG]: 'storybook-twig',
}

/**
 * @assumption we are already inside the particle root directory
 * Currently only supports react
 */
module.exports = class extends Generator {
  configuration: Answers
  updatePackageJson: (newJson: Record<string, any>) => void
  framework: FrontendFrameworkOptions
  props: {
    storybook_type: FrontendFrameworkOptions
    storybook_addons: string[]
  }
  constructor(args: any, opts: any) {
    super(args, opts)
    this.configuration = opts.configuration
    this.updatePackageJson = opts.updatePackageJson
    this.framework = opts.framework
    this.props = {
      storybook_type: opts.framework,
      storybook_addons: [],
    }
  }

  async prompting() {
    const frameworkPrompt = {
      type: 'list',
      name: 'storybook_type',
      message: 'What will you be using Storybook for?',
      choices: Object.values(FrontendFrameworkOptions),
    }
    const prompts = [
      ...(!this.props.storybook_type ? [frameworkPrompt] : []),
      {
        type: 'checkbox',
        name: 'storybook_addons',
        message: 'What addons would you like to use (all enabled by default)',
        choices: storybookAddons,
      },
    ]
    const answers = await this.prompt(prompts)
    this.props = { ...this.props, ...answers }
  }

  configuring() {
    let devDependencies: LooseObject = {}
    storybookAddons.forEach((addon) => {
      if (this.props.storybook_addons.includes(addon.name)) {
        const dependency = Object.keys(addon.dependency)[0]
        const version = Object.values(addon.dependency)[0]
        devDependencies[dependency] = version
      }
    })
    const storybookTypeKey: string = FrontendOptions[this.props.storybook_type]
    const pkgJson = {
      devDependencies: {
        ...devDependencies,
        [storybookTypeKey]: sbVersion,
      },
    }

    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson)
  }

  writing() {
    // this.fs.copyTpl(
    //   this.templatePath('main.js'),
    //   this.destinationPath('.storybook/main.js'),
    //   { storybook_addons: this.props.storybook_addons.toString() }
    // )
    mkdirp.sync(this.destinationPath('.storybook'))
    this.fs.write(
      this.destinationPath(`.storybook/main.js`),
      main({
        addons: this.props.storybook_addons.map(addon => `@storybook/addon-${addon}`),
        componentLibraryPath: `../..`,
        storiesRoot: [
          '../stories/**/*.stories.mdx',
          '../stories/**/*.stories.@(js|jsx|ts|tsx)',
        ],
      })
    )
  }

  install() {
    this.npmInstall()
  }

  // addStorybookDependencies() {
  //   // TODO to add support for other frameworks
  //   const dependencies = ['@storybook/react', ...storybookAddons]

  //   console.log(white('adding storybook dependencies to the packageJson'))

  //   // if noInstall flag is passed assume that updatePackageJson was passed and fire off command
  //   // else run npm install
  //   this.updatePackageJson({
  //     scripts: {
  //       'build:storybook': 'build-storybook -c ./apps/storybook',
  //       'dev:storybook': 'start-storybook -p 6006 -c ./apps/storybook',
  //     },
  //     devDependencies: dependencies.reduce<Record<string, string>>(
  //       (acc, value: string) => {
  //      clear   acc[value] = storybookSupportedVersion
  //         return acc
  //       },
  //       {}
  //     ),
  //   })
  // }

  // async createStorybookFiles() {
  //   console.log(white('creating files & folders for storybook'))

  //   // create the folders
  //   fs.mkdirSync(`${process.cwd()}/${storybookPath}/`, { recursive: true })

  //   // create the files
  //   fs.writeFileSync(
  //     this.destinationPath(`${storybookPath}/main.js`),
  //     main({
  //       addons: storybookAddons,
  //       componentLibraryPath: `../../${this.configuration.componentLibraryPath}`,
  //       storiesRoot,
  //     })
  //   )
  //   fs.writeFileSync(
  //     this.destinationPath(`${storybookPath}/preview.js`),
  //     preview({
  //       frontendFramework: FrontendFrameworkOptions.REACT,
  //     })
  //   )
  // }
}
