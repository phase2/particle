const {
  patternPaths,
} = require('../dist/pl/styleguide/data/patternlab-data.json');

// Returns an array of urls for the particles that exist
// in a particle project.
// Example output:
// [
//   '00-protons-demo-borders',
//   '00-protons-demo-breakpoints',
// ]
module.exports = [].concat(
  ...Object.keys(patternPaths).map(url => Object.values(patternPaths[url]))
);
