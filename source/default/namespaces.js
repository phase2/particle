/**
 * Share atomic concepts with Webpack, Gulp, Pattern Lab, Drupal, etc
 */

const path = require('path');

const sets = {
  protons: path.resolve(__dirname, '_patterns', '00-protons'),
  atoms: path.resolve(__dirname, '_patterns', '01-atoms'),
  molecules: path.resolve(__dirname, '_patterns', '02-molecules'),
  organisms: path.resolve(__dirname, '_patterns', '03-organisms'),
  templates: path.resolve(__dirname, '_patterns', '04-templates'),
  pages: path.resolve(__dirname, '_patterns', '05-pages'),
};

module.exports = {
  sets,
};
