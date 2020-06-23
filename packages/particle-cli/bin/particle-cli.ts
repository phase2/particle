#!/usr/bin/env node

import program from 'commander'

import pkg from '../package.json'
import { generatePromptOptions } from './../lib/generatePromptOptions'
import create from '../lib/create'

/**
 * Initialize Commander program with version.
 */
program.version(pkg.version, '-V, --version')

program
  .command('create')
  .alias('init')
  .description('Scaffold your project from a set of prompts.')
  .action(function () {
    // @TODO Implement Create Function.
    generatePromptOptions().then(create)
  })

// allow commander to parse `process.argv`
program.parse(process.argv)
