//run by typing : node tools/pl-paths.js

const plData = require('../dist/pl/styleguide/data/patternlab-data.json');
const particles = [
  'protons',
  'atoms',
  'molecules',
  'organisms',
  'templates',
  'pages',
];
let paths = [];

particles.forEach(particle => {
  const urls = Object.values(plData.patternPaths[particle]);
  paths = paths.concat(urls);
});
console.log(paths);
