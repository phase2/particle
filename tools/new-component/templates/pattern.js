/**
 * <%= camelCaseName %>
 */

// Module dependencies
import 'protons';

// Module styles
import './_<%= name %>.scss';

// Module template
import './_<%= name %>.twig';

export const name = '<%= camelCaseName %>';

export function disable() {}

export function enable() {}

export default enable;
