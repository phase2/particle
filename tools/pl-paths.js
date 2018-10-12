//run with : node tools/pl-paths.js

const plData = require('../dist/pl/styleguide/data/patternlab-data.json');
const particles = Object.keys(plData.patternPaths);
let paths = [];

particles.forEach(particle => {
  const urls = Object.values(plData.patternPaths[particle]);
  paths.push(...urls);
});
console.log(paths);
