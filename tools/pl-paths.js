// PATTERN LAB PATHS
// Uses the generated JSON file from Pattern Lab when building to create an
// array of available components and their associated pathways. Can be modulized
// by exporting as a function with no arguments. Lacks failsafe code to check
// that the file exists on the disc; use Node.js "fs" for this. Looping
// failsafes can be added by referencing the appropriate loop's label for break
// and continue functions.

// USE
// @import './pl-paths';
// const component = plPath[i];

// Grab JSON data from Pattern Lab with all components
const plData = require('../dist/pl/styleguide/data/patternlab-data.json');

// Create empty output object and populate secondary array with values from JSON
const plComp = [];
const plPaths = Object.values(plData.patternPaths);

// Loop through root keys
plRoot: for (const key in plPaths) {
  // Create object containing nested object data
  const mda = plPaths[key];

  // Loop through nested object and add values to output object
  plSub: for (const sub in mda) {
    plComp.push(mda[sub]);
  }
}

// Debugging: log output object to console
// (Also used for Node.js output)
console.log(plComp);
