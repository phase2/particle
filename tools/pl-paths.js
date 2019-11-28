/**
 * Extract all the Pattern Lab paths out of built PL assets, both HTML and partial
 */

const {
  patternPaths,
  navItems,
  // eslint-disable-next-line import/no-unresolved
} = require('../dist/app-node-pl/pl/styleguide/data/patternlab-data.cjs.js');

// Shape of patternPaths data:
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
delete patternPaths['protons-demo'];
// eslint-disable-next-line
delete patternPaths['atoms-demo']['svgicons'];
const componentPaths = [].concat(
  ...Object.values(patternPaths).map(atomic => Object.values(atomic))
);

// Shape of navItems data:
// navItems: {
//   patternTypes: [
//     {
//       patternTypeDash: atoms
//       patternTypeItems: [
//         {
//           patternSubtypeItems: [
//             {
//               patternPath: '01-atoms-alert/index.html',
//               patternSrcPath: '01-atoms/alert/demo/alerts',
//               patternName: 'Alerts',
//               patternState: '',
//               patternPartial: 'atoms-alerts'
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }

// Backstop, or other VRT testing platforms, will use the query forms of the pattern
// demo paths in order to ensure all styles are present and rendered.
const partials = navItems.patternTypes.reduce(
  (accumulated, { patternTypeItems }) => {
    patternTypeItems.forEach(({ patternSubtypeItems }) => {
      patternSubtypeItems.forEach(({ patternName, patternPartial }) => {
        if (patternName !== 'View All') {
          accumulated.push(patternPartial);
        }
      });
    });
    return accumulated;
  },
  []
);

module.exports = {
  paths,
  partials,
  htmlPaths: paths.map(path => `patterns/${path}/${path}.rendered.html`),
  componentPaths: componentPaths.map(
    path => `patterns/${path}/${path}.rendered.html`
  ),
};
