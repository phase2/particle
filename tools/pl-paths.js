/**
 * Extract all the Pattern Lab paths out of built PL assets
 */

const {
  patternPaths,
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

const paths = [].concat(
  ...Object.values(patternPaths).map(atomic => Object.values(atomic))
);

module.exports = {
  paths,
  htmlPaths: paths.map(path => `patterns/${path}/${path}.html`),
};
