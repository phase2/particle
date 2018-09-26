/**
 * <%= camelCaseName %>
 */

import $ from 'jquery';

// Module dependencies
import 'protons';

// Module styles
import './_<%= name %>.scss';

// Module template
import './_<%= name %>.twig';

export const name = '<%= camelCaseName %>';

export function disable() {}

export function enable($context) {
  const $<%= camelCaseName %> = $('.<%= camelCaseName %>', $context);
  // Bail if component does not exist
  if (!$<%= camelCaseName %>.length) {
    return;
  }
  // Only do stuff to component if it exists
  $<%= camelCaseName %>.addClass('js-exists'); // Please remove/change this
}

export default enable;
