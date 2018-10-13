const {
  patternPaths,
} = require('../dist/pl/styleguide/data/patternlab-data.json');
const urlArr = [];

Object.values(patternPaths).map(a => {
  Object.values(a).map(b => {
    urlArr.push(b);
  });
});
module.exports = urlArr;
