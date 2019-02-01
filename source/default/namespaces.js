/**
 * Share atomic concepts with Webpack, Gulp, Pattern Lab, Drupal, etc
 */

const path = require('path');

const namespaceMaker = require('../../tools/namespace-maker');

const sets = {
  default_protons: path.resolve(__dirname, '_patterns', '00-protons'),
  default_atoms: path.resolve(__dirname, '_patterns', '01-atoms'),
  default_molecules: path.resolve(__dirname, '_patterns', '02-molecules'),
  default_organisms: path.resolve(__dirname, '_patterns', '03-organisms'),
  default_templates: path.resolve(__dirname, '_patterns', '04-templates'),
  default_pages: path.resolve(__dirname, '_patterns', '05-pages'),
};

const namespaces = namespaceMaker(path.resolve(__dirname, '_patterns'), sets);

module.exports = {
  sets,
  namespaces,
};
