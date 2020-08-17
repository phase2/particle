import Generator from 'yeoman-generator'
import { Answers } from '@phase2/particle-types'
import _ from 'lodash';
import { _cypress, _jest, _main, _react, _typescript, _vue } from './configs'
import fs from 'fs'

/**
 * @assumption we are already inside the particle root directory
 * Currently only supports react
 */
module.exports = class extends Generator {
  configuration: Answers
  updatePackageJson: (newJson: Record<string, any>) => void
  constructor(args: any, opts: any) {
    super(args, opts)
    this.configuration = opts.configuration
    this.updatePackageJson = opts.updatePackageJson
  }

  refiner(objValue: any, srcValue: any) {
    if (_.isArray(objValue)) {

      return _.union(objValue.concat(srcValue));
    }
  }

  buildESLint() {
    const {frontendFramework ,hasTypescript, testingLibraries  } = this.configuration.options
    console.log(frontendFramework, hasTypescript, testingLibraries)
    const fe: object = frontendFramework[0] === 'react' ? _react : 'vue' ? _vue : {};
    const ts: object = !!hasTypescript ? _typescript : {};
    const tests: string[] = <string[]>testingLibraries;
    const cyp: object = tests.includes('cypress') ? _cypress : {};
    const jest: object = tests.includes('jest') ? _jest : {};
    const content = _.mergeWith(_main, fe, ts, cyp, jest, this.refiner);
    console.log(content, _main, fe, ts, cyp, jest)

   // fs.writeFileSync(`${process.cwd()}/.eslintrc.js`, JSON.stringify(content))
    // return _.mergeWith (_main, fe, ts, cyp, jest, this.refiner)
 }

  // async createESLint() {
    // const buildESLint =()=> {
    //   const {frontendFramework ,hasTypescript, testingLibraries  } = this.configuration.options
    //
    //   const fe: object = frontendFramework[0] === 'react' ? _react : 'vue' ? _vue : {};
    //   const ts: object = !!hasTypescript ? _typescript : {};
    //   const tests: string[] = <string[]>testingLibraries;
    //   const cyp: object = tests.includes('cypress') ? _cypress : {};
    //   const jest: object = tests.includes('jest') ? _jest : {};
    //   const content = _.mergeWith (_main, fe, ts, cyp, jest, this.refiner)
    //   // return _.mergeWith (_main, fe, ts, cyp, jest, this.refiner)
    //   return (`module.exports = ${content}`);
    //
    // }
    // console.log(`Write config to ${process.cwd()}/.eslintrc.js`, this.buildESLint())
    // @ts-ignore
    // fs.writeFileSync(`${process.cwd()}/.eslintrc.js`, this.buildESLint() )
  // }

//
//   addStorybookDependencies() {
//     // TODO to add support for other frameworks
//     const dependencies = ['@storybook/react', ...storybookAddons]
//
//     console.log(white('adding eslint dependencies to the packageJson'))
//
//     // if noInstall flag is passed assume that updatePackageJson was passed and fire off command
//     // else run npm install
//     this.updatePackageJson({
//       scripts: {
//         'build:storybook': 'build-storybook -c ./apps/storybook',
//         'dev:storybook': 'start-storybook -p 6006 -c ./apps/storybook',
//       },
//       devDependencies: dependencies.reduce<Record<string, string>>(
//         (acc, value: string) => {
//           acc[value] = storybookSupportedVersion
//           return acc
//         },
//         {}
//       ),
//     })
//   }
//
//   async createStorybookFiles() {
//     console.log(white('creating files & folders for storybook'))
//
//     // create the folders
//     fs.mkdirSync(`${process.cwd()}/${storybookPath}/`, { recursive: true })
//
//     // create the files
//     fs.writeFileSync(
//       this.destinationPath(`${storybookPath}/main.js`),
//       main({
//         addons: storybookAddons,
//         componentLibraryPath: `../../${this.configuration.componentLibraryPath}`,
//         storiesRoot,
//       })
//     )
//     fs.writeFileSync(
//       this.destinationPath(`.eslintrc.js`)
//     )
//   }
}
