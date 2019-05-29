/**
 * <%= camelCaseName %>
 *
 * Mount all vue widgets via the root index.js file.
 */

// Module dependencies
import 'protons';

// Module template
import './_<%= name %>.twig';

// All Vue widgets only execute on existence of DOM
import <%= capitalizedName %> from './src';

// Dummy data for PL. These values should be overwritten inside of your
// app's entry point. i.e. particle/apps/drupal/index.js
import defaults from './demo/<%= name %>.json';

// Render Vue elements as soon as possible
const Local<%= capitalizedName %> = document.getElementById('vue-<%= name %>')
  ? <%= capitalizedName %>('#vue-<%= name %>')
  : undefined;

export const name = '<%= camelCaseName %>';

/**
 * Components may need to run clean-up tasks if they are removed from DOM.
 *
 * @param {jQuery} $context - A piece of DOM
 * @param {Object} settings - Pertinent settings
 */
// eslint-disable-next-line no-unused-vars
export function disable($context, settings) {}

/**
 * Each component has a chance to run when its enable function is called. It is
 * given a piece of DOM ($context) and a settings object. We destructure our
 * component key off the settings object and provide an empty object fallback.
 * Incoming settings override default settings via Object.assign().
 *
 * @param {jQuery} $context - A piece of DOM
 * @param {Object} settings - Settings object
 */
export function enable($context, { <%= camelCaseName %> = {} }) {
  // Merge defaults with incoming settings
  const settings = Object.assign(defaults, <%= camelCaseName %>);

  // If the element exists, dispatch the action that will populate the store with data.
  if (Local<%= capitalizedName %>) {
    Local<%= capitalizedName %>.$store.dispatch('<%= name %>/fetchData', settings);
  }
}

export default enable;
