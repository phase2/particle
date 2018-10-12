// run with : node tools/pl-paths.js

const {
  patternPaths,
} = require('../dist/pl/styleguide/data/patternlab-data.json');

// Concats and spreads all urls of the atomic particles that exist
// in the project.
// Example output:
// [
//   '00-protons-demo-borders',
//   '00-protons-demo-breakpoints',
// ]
module.exports = [].concat(
  ...Object.keys(patternPaths).map(url => Object.values(patternPaths[url]))
);
