/**
 * Merge shared jest config with local design system config
 */

const { merge } = require('lodash');

const sharedConfig = require('../../jest.config');

module.exports = merge({}, sharedConfig, {
  rootDir: '../../',
  moduleNameMapper: {
    '^protons[/]?(.*)': '<rootDir>/source/default/_patterns/00-protons/$1',
    '^atoms[/]?(.*)': '<rootDir>/source/default/_patterns/01-atoms/$1',
    '^molecules[/]?(.*)': '<rootDir>/source/default/_patterns/02-molecules/$1',
    '^organisms[/]?(.*)': '<rootDir>/source/default/_patterns/03-organisms/$1',
    '^templates[/]?(.*)': '<rootDir>/source/default/_patterns/04-templates/$1',
    '^pages[/]?(.*)': '<rootDir>/source/default/_patterns/05-pages/$1',
  },
});
