/**
 * Recursive function that takes any Dart Sass type and returns a JS equivalent
 * @param {*} a - Sass type
 * @returns {string|object|array} - jS equivalent
 */

const { types } = require('sass');

module.exports = function getValue(a) {
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
    // rgb() vs rgba() caps on the color string
    const [start, end] = a.getA() ? ['rgba(', `${a.getA()})`] : ['rgb(', ')'];
    // Start and end do not need commas
    return [start, [a.getR(), a.getG(), a.getB()].join(','), end].join('');
  }
  // List
  if (a instanceof types.List) {
    const list = [];
    for (let i = 0; i < a.getLength(); i += 1) {
      list.push(getValue(a.getValue(i)));
    }
    return list;
  }
  // Map
  if (a instanceof types.Map) {
    const map = {};
    for (let i = 0; i < a.getLength(); i += 1) {
      map[a.getKey(i).getValue()] = getValue(a.getValue(i));
    }
    return map;
  }

  // Fallback
  return types.Null.NULL;
};
