#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package');
const create = require('../lib/create');

/**
 * Initialize Commander program with version.
 */
program
  .version(pkg.version, '-V, --version');

program.command('create')
  .alias('init')
  .description('Scaffold your project from a set of prompts.')
  .action(function() {
    // @TODO Implement Create Function.
    create();
  });

// allow commander to parse `process.argv`
program.parse(process.argv);
