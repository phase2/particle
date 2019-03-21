/**
 * Extract all the Pattern Lab paths out of built PL assets
 */

const {
  patternPaths,
  // eslint-disable-next-line import/no-unresolved
} = require('../dist/app-pl/pl/styleguide/data/patternlab-data.json');

// Shape of data:
//
// patternPaths: {
//   protons: {
//     borders: '00-protons-demo-borders',
//     tables: '00-protons-demo-tables',
//     // ...
//   },
//   atoms: {},
//   molecules: {},
//   // ...
// }

// all particle paths
const paths = [].concat(
  ...Object.values(patternPaths).map(atomic => Object.values(atomic))
);

// only check our actual components from atoms up
delete patternPaths.protons;
delete patternPaths.atoms.svgicons;
const componentPaths = [].concat(
  ...Object.values(patternPaths).map(atomic => Object.values(atomic))
);

module.exports = {
  paths,
  htmlPaths: paths.map(path => `patterns/${path}/${path}.html`),
  componentPaths: componentPaths.map(path => `patterns/${path}/${path}.html`),
};
