/**
 * Design System
 * The kitchen sink of all design components. There is a little bit of "magic"
 * below, so be sure to read each section.
 */

import { basename, dirname } from 'path';

// The components collection. Keys are folder names.
const components = {};

/**
 * Accepts the result of require.context() to add it all to our great big
 * components object with keys that are the folder names of components, ie
 *
 *   01-atoms/vue-widget/index.js
 *
 * results in:
 *
 *   components['vue-widget'] = {name: 'vue-widget', enable() {}, disable() {}}
 *
 * @param context
 */
function importAll(context) {
  context.keys().forEach(componentPath => {
    const componentName = basename(dirname(componentPath));
    components[componentName] = context(componentPath);
  });
}

/**
 * Dynamically discover all root patterns using Webpack's require.context().
 * This attempts to find ONLY the first index.js file within a component folder.
 * Important: the regex must be "statically analyzable", meaning we cannot set
 * the regex to a variable. (https://github.com/webpack/webpack/issues/4772).
 *
 * @TODO: A cleaner regex to get only the first level index.js, no deeper
 */
// Atoms
importAll(
  require.context(
    './_patterns/01-atoms',
    true,
    /^(?!.*(demo|src)).*index\.js$/ //
  )
);
// Molecules
importAll(
  require.context(
    './_patterns/02-molecules',
    true,
    /^(?!.*(demo|src)).*index\.js$/
  )
);
// Organisms
importAll(
  require.context(
    './_patterns/03-organisms',
    true,
    /^(?!.*(demo|src)).*index\.js$/
  )
);
// Templates (skipping for design system)
// importAll(
//   require.context(
//     './_patterns/04-templates',
//     true,
//     /^(?!.*(demo|src)).*index\.js$/
//   )
// );
// Pages (skipping for design system)
// importAll(
//   require.context(
//     './_patterns/05-pages',
//     true, /^(?!.*(demo|src)).*index\.js$/
//   )
// );

/**
 * Default export of object containing all components
 */
export default components;

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
