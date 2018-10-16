/* This script outputs an array of all the url paths within Pattern Lab.
This array of paths will be useful for testing tools such as BackstopJS and Pa11y by running
those paths for testing to help ensure accessibility.
*/

const {
  patternPaths,
} = require('../dist/pl/styleguide/data/patternlab-data.json');

const paths = [].concat(
  ...Object.values(patternPaths).map(particle => Object.values(particle))
);

console.log(paths);

module.exports = paths;
