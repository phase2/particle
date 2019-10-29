/**
 * @file
 * Export Sass variables as a JSON file written to the filesystem
 */

const path = require('path');

const fs = require('fs-extra');
const jsondiff = require('jsondiffpatch');

const getValue = require('./dart-sass-value');

/**
 * Take in a directory path, return a function that expects file naem and Sass
 * structure to be turned into JSON at the directory path
 */
module.exports = destFolder => (sassFileName, value) => {
  // e.g. apps/node-pl/pattern-lab/_data/sass-variables.json
  const filename = path.join(destFolder, sassFileName.getValue());
  // The JS representation of the Sass type
  const output = getValue(value);

  // Start by reading the JSON file, parsing to JS structure
  fs.readJson(filename, (readerr, existingJson) => {
    if (readerr) console.error(readerr, `Creating ${path.basename(filename)}!`);
    // Only write output if there is a difference or non-existent target file
    if (jsondiff.diff(existingJson, output)) {
      fs.outputJson(filename, output, writeerr => {
        if (writeerr) console.error(writeerr);
      });
    }
  });

  // Immediately return NULL
  return getValue();
};
