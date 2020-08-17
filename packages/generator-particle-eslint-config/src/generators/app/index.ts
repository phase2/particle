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
}
