/**
 * Generate an object that looks like:
 *
 * {
 *   protons: {
 *     paths: [
 *       '/full/path/to/00-protons',
 *       // ...
 *     ],
 *   },
 *   atoms: {
 *     paths: [
 *       '/full/path/to/01-atoms',
 *       '/full/path/to/01-atoms/button',
 *       // ...
 *     ],
 *   },
 *   // ...
 * }
 */

const dirTree = require('directory-tree');

/**
 *
 * @param {String} root - Path to common parent of namespaces
 * @param {Object} sets - Object of each namespace and path string to location
 * @param {Object} options - directory-tree package options
 * @returns {{}} - See comment above
 */
module.exports = function namespaceMaker(
  root,
  sets,
  options = {
    extensions: /\.twig/,
    exclude: /demo/,
  }
) {
  const tree = dirTree(root, options);

  return Object.keys(sets).reduce((acc, atomic) => {
    // sets.protons.paths = [ './first/path', ...];
    acc[atomic] = { paths: [] };
    // Look in full root for atomic set
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

    return acc;
  }, {});
};
