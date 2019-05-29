/**
 * Extract all the Pattern Lab paths out of built PL assets, both HTML and partial
 */

const {
  patternPaths,
  navItems,
  // eslint-disable-next-line import/no-unresolved
} = require('../dist/app-pl/pl/styleguide/data/patternlab-data.json');

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
delete patternPaths.protons;
delete patternPaths.atoms.svgicons;
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
const partials = [].concat(
  ...navItems.patternTypes.map(patternType => {
    const patterns = [];
    patternType.patternTypeItems.forEach(patternTypeItem => {
      patternTypeItem.patternSubtypeItems.forEach(patternSubtypeItem => {
        if (patternSubtypeItem.patternName !== 'View All') {
          patterns.push(patternSubtypeItem.patternPartial);
        }
      });
    });
    return patterns;
  })
);

module.exports = {
  paths,
  partials,
  htmlPaths: paths.map(path => `patterns/${path}/${path}.html`),
  componentPaths: componentPaths.map(path => `patterns/${path}/${path}.html`),
};
