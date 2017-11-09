/**
 * Button
 */

import $ from 'jquery';
import 'bootstrap/js/src/button';

// Custom
import 'base';

// Import custom sass, includes Bootstrap sass
import './_button.scss';

export const name = 'card';

export function disable() {}

export function enable($context) {
  $('#blah', $context).button('toggle');
}

export default enable;
