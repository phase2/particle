#!/usr/bin/env node

import program from 'commander'
import path from 'path'
import { spawn } from 'child_process'

import pkg from '../../package.json'

/**
 * Initialize Commander program with version.
 */
program.version(pkg.version, '-V, --version')

program
  .command('create')
  .alias('init')
  .description('Scaffold your project from a set of prompts.')
  .action(function () {
    // runs yeoman under the hood and resolves the yeoman module directly
    spawn('yo', [path.resolve(__dirname, '../generators/app/')], {
      stdio: 'inherit',
    })
  })

// allow commander to parse `process.argv`
program.parse(process.argv)
