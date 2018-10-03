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

/**
 * The components collection. Keys will be the exported name of each component,
 * values will be the component itself.
 */
export const components = {};

/**
 * Accepts the result of require.context() to add it all to our great big
 * components object with keys that are the name of components, i.e.
 *
 *   // 01-atoms/vue-widget/index.js
 *   export const name = 'vue-widget';
 *
 * results in:
 *
 *   components['vue-widget'] = {name: 'vue-widget', enable() {}, disable() {}}
 *
 * @param context
 */
function importAll(context) {
  console.log(context.keys());

  // context.keys().forEach(componentPath => {
  //   // "require" the component
  //   const component = context(componentPath);
  //   // Add a key to the components object that is the component's name, and a
  //   // value that is full component
  //   components[component.name] = component;
  // });
}

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
 * @TODO: A cleaner regex to get only the first level index.js, no deeper
 */
// Atoms
importAll(
  require.context(
    'atoms',
    true,
    /^(?!.*(demo|src)).*index\.js$/ // See note on static regex
  )
);
// Molecules
import * as card from 'molecules/card';
components.card = card;

// importAll(
//   require.context(
//     './_patterns/02-molecules/',
//     true,
//     /^(?!.*(demo|src)).*index\.js$/ // See note on static regex
//   )
// );

console.log(components);

// // Organisms
// importAll(
//   require.context(
//     'organisms',
//     true,
//     /^(?!.*(demo|src)).*index\.js$/ // See note on static regex
//   )
// );
// Templates. Skipping for design system. Include per-app.
// importAll(
//   require.context(
//     'templates',
//     true,
//     /^(?!.*(demo|src)).*index\.js$/
//   )
// );
// Pages. Skipping for design system. Include per-app.
// importAll(
//   require.context(
//     'pages',
//     true, /^(?!.*(demo|src)).*index\.js$/
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
