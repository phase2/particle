import Generator from 'yeoman-generator'
import { Answers } from '@phase2/particle-types'
import _ from 'lodash';
import configs from './configs'
import fs from 'fs'
import util from 'util'

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
    // Destructure relevant options data.
    const {frontendFramework ,hasTypescript, testingLibraries  } = this.configuration.options

    const frameworks: string[] = <string[]>frontendFramework ;
    const tests: string[] = <string[]>testingLibraries;
    const ts: string = !!hasTypescript ? 'typescript' : '';
    const elements: object[] = ['main', ...frameworks, ...tests, ts].map(el => {
      // @ts-ignore
      return !!configs[`_${el}`] ? configs[`_${el}`] : {};
    })

    const esModule = `module.exports = ${
      util.inspect(
    // @ts-ignore
        _.mergeWith(...elements, this.refiner), 
        {depth: null}
        )
      }
    `;

   fs.writeFileSync(`${process.cwd()}/.eslintrc.js`, esModule)
 }
}
