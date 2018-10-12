const {
  patternPaths,
} = require('../dist/pl/styleguide/data/patternlab-data.json');

// Returns an array of urls for the patterns that exist
// in a pattern lab project.
// Example output:
// [
//   '00-protons-demo-borders',
//   '00-protons-demo-breakpoints',
// ]
module.exports = [].concat(
  ...Object.keys(patternPaths).map(pattern =>
    Object.values(patternPaths[pattern])
  )
);
