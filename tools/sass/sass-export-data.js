/**
 * @file
 * Export sass variables as a JSON file written to the filesystem
 */

const fs = require('fs-extra');
const path = require('path');
const jsondiff = require('jsondiffpatch');

const { types } = require('sass');

/**
 * Recursive function that takes any Dart Sass type and returns a JS equivalent
 * @param {*} a - Sass type
 * @returns {string|object|array} - jS equivalent
 */
function getValue(a) {
  // String
  if (a instanceof types.String) {
    return a.getValue();
  }
  // Number
  if (a instanceof types.Number) {
    return a.getUnit() ? `${a.getValue()}${a.getUnit()}` : a.getValue();
  }
  // Color
  if (a instanceof types.Color) {
    const alpha = a.getA();
    return `rgb${alpha && 'a'}(${a.getR()}, ${a.getG()}, ${a.getB()}${alpha &&
      `, ${alpha}`})`;
  }
  // List
  if (a instanceof types.List) {
    const list = [];
    for (let i = 0; i < a.getLength(); i++) {
      list.push(getValue(a.getValue(i)));
    }
    return list;
  }
  // Map
  if (a instanceof types.Map) {
    const map = {};
    for (let i = 0; i < a.getLength(); i++) {
      map[a.getKey(i).getValue()] = getValue(a.getValue(i));
    }
    return map;
  }

  // Fallback
  return types.Null.NULL;
}

module.exports = destFolder => (sassFileName, value) => {
  // e.g. apps/node-pl/pattern-lab/_data/scssVariables.json
  const filename = path.join(destFolder, sassFileName.getValue());
  // The JS representation of the Sass type
  const output = getValue(value);
  // console.log(output);

  // Write to disk. Fat-arrow because we simply want the parent scope vars
  const write = () => {
    fs.ensureDir(path.dirname(filename), err => {
      if (err) throw err;
      fs.writeFile(filename, JSON.stringify(output, null, '  '), writeerr => {
        if (writeerr) throw writeerr;
        // console.log(`${filename} saved.`);
      });
    });
  };

  // It is recommended to fs.readFile() and handle error if not exists instead of fs.exists
  fs.readFile(filename, 'utf8', (readerr, existingdata) => {
    // If the file does not exist just write file
    if (readerr && readerr.code === 'ENOENT') {
      write();
    }
    // If there already exists data in the target file
    if (existingdata) {
      // Convert existing string to object, and then compare
      const existingObject = JSON.parse(existingdata);
      // If there is no difference, then simply return and do not write file
      if (!jsondiff.diff(existingObject, output)) {
        return types.Null.NULL;
      }
      // Otherwise write out the new, unique-values file
      write();
    }
    // return value;
    return types.Null.NULL;
  });

  // return value;
  return types.Null.NULL;
};
