/**
 * Share atomic concepts with Webpack, Gulp, Pattern Lab, Drupal, etc
 */

const path = require('path');
const dirTree = require('directory-tree');

const sets = {
  protons: path.resolve(__dirname, '_patterns', '00-protons'),
  atoms: path.resolve(__dirname, '_patterns', '01-atoms'),
  molecules: path.resolve(__dirname, '_patterns', '02-molecules'),
  organisms: path.resolve(__dirname, '_patterns', '03-organisms'),
  templates: path.resolve(__dirname, '_patterns', '04-templates'),
  pages: path.resolve(__dirname, '_patterns', '05-pages'),
};

const tree = dirTree(path.resolve(__dirname, '_patterns'), {
  extensions: /\.twig/,
  exclude: /demo/,
});

const namespaces = Object.keys(sets).reduce((acc, atomic) => {
  // sets.protons.paths = [ './first/path', ...];
  acc[atomic] = { paths: [] };
  // Look in full tree for atomic set
  const category = tree.children.find(child => child.path === sets[atomic]);
  // Always add top level (_patterns/00-protons, _patterns/01-atoms, etc)
  acc[atomic].paths.push(category.path);
  // Get top-level patterns only for now (@TODO: recursive dive)
  const patterns = category.children
    .filter(({ type, children }) => type === 'directory' && !!children.length)
    .map(({ path: patternPath }) => patternPath);
  // Spread all patterns to their correct namespace
  acc[atomic].paths.push(...patterns);
  // Sort
  acc[atomic].paths.sort();
  // console.log(category);

  return acc;
}, {});

module.exports = {
  sets,
  namespaces,
};
