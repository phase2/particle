import Generator from 'yeoman-generator'
import { Answers } from '@phase2/particle-types'
import _ from 'lodash';
import { _cypress, _jest, _main, _react, _typescript, _vue } from './configs'
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

    // Check for frontend framework.
    const fe: object = frontendFramework[0] === 'react' ? _react : 'vue' ? _vue : {};

    // Check for typescript.
    const ts: object = !!hasTypescript ? _typescript : {};

    // create array of possible testing libraries.
    const tests: string[] = <string[]>testingLibraries;
    const cyp: object = tests.includes('cypress') ? _cypress : {};
    const jest: object = tests.includes('jest') ? _jest : {};

    // Compile module as string.
    const esModule = `module.exports = ${
      util.inspect(
        _.mergeWith(_main, fe, ts, cyp, jest, this.refiner), 
        {depth: null}
        )
      }
    `;

   fs.writeFileSync(`${process.cwd()}/.eslintrc.js`, esModule)
 }
}
