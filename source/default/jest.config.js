/**
 * Merge shared jest config with local design system config
 */
const path = require('path');
const { merge } = require('lodash');

const sharedConfig = require('../../jest.config');
const { sets } = require('./namespaces');

const rootDir = '../../';

/**
 * Jest config per folder needs:
 *   rootDir: '../../',
 *   moduleNameMapper: {
 *     '^protons[/]?(.*)': '<rootDir>/source/default/_patterns/00-protons/$1',
 *     '^atoms[/]?(.*)': '<rootDir>/source/default/_patterns/01-atoms/$1',
 *     '^molecules[/]?(.*)': '<rootDir>/source/default/_patterns/02-molecules/$1',
 *     '^organisms[/]?(.*)': '<rootDir>/source/default/_patterns/03-organisms/$1',
 *     '^templates[/]?(.*)': '<rootDir>/source/default/_patterns/04-templates/$1',
 *     '^pages[/]?(.*)': '<rootDir>/source/default/_patterns/05-pages/$1',
 *   },
 */
const moduleNameMapper = Object.entries(sets).reduce((acc, entry) => {
  // i.e '^protons[/]?(.*)'
  const nameRegex = `^${entry[0]}[/]?(.*)`;
  // i.e source/default/_patterns/04-templates
  const namePath = path.relative(path.join(__dirname, rootDir), entry[1]);
  // i.e. moduleNameMapper['^protons[/]?(.*)'] = '<rootDir>/source/default/_patterns/00-protons/$1';
  acc[nameRegex] = `<rootDir>/${namePath}/$1`;
  return acc;
}, {});

module.exports = merge({}, sharedConfig, {
  rootDir,
  moduleNameMapper,
});
