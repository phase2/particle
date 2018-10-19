/**
 * Design System
 *
 * The kitchen sink of all design components. Essentially, we build up a
 * `components` object that is exported that contains every component in our
 * design system that should be available.
 *
 * There is a little bit of "magic" below, so be sure to read each section.
 *
 * If you prefer NO MAGIC, then simply modify this file so that you import each
 * component manually, and provide keys to the `components` module, ie.
 *
 *   import * as vueWidget from '@molecules/vue-widget';
 *   import * as card from '@molecules/card';
 *   // ...
 *   export const components = {
 *     vueWidget,
 *     card,
 *     // ...
 *   };
 */

import importAll from '../../tools/webpack/import-all';

/**
 * Dynamically discover all root patterns using Webpack's require.context().
 * This attempts to find ONLY the first index.js file within a component folder.
 *
 * Usually the first argument to require.context() would be a folder path, but
 * we have our Atomic Design paths aliased, i.e.
 *
 *   'atoms' is actually './_patterns/01-atoms'
 *
 * IMPORTANT: the regex must be "statically analyzable", meaning we cannot set
 * the regex to a variable. (https://github.com/webpack/webpack/issues/4772).
 *
 * A note on the regex below: Given paths like:
 *   ./01-atoms/thing-component/blah/blah/
 * the regex finds only the top atomic level path (./thing-component) to include
 */

const atomicContext = require.context(
  // From patterns folder
  './_patterns',
  // Deep dive all directories below
  true,
  // Get the first folders after atoms|molecules|organisms
  /^\.\/(01-atoms|02-molecules|03-organisms)\/[\w-]+$/
);

/**
 * The components collection. Keys will be the exported name of each component,
 * values will be the component itself.
 */
export const components = importAll(atomicContext);

// Templates. Skipping for design system. Include per-app.
// importAll(
//   require.context(
//     'templates',
//     true,
//     /^\.\/[\w-]+$/ // See note on static regex
//   )
// );
// Pages. Skipping for design system. Include per-app.
// importAll(
//   require.context(
//     'pages',
//     true,
//     /^\.\/[\w-]+$/ // See note on static regex
//   )
// );

/**
 * All component names as an array
 * @returns {Array} List of components name strings
 */
export const componentNames = () =>
  Object.values(components).map(({ name }) => name);

/**
 * Enable all components against a piece of DOM with some settings
 */
export const enableAllComponents = ($dom, settings) =>
  Object.values(components).forEach(({ enable }) => enable($dom, settings));

export default components;
