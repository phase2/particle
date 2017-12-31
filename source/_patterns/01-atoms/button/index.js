/**
 * Button
 */

import $ from 'jquery';
import 'bootstrap/js/src/button';

// Custom
import 'protons';

// Import custom sass, includes Bootstrap sass
import './_button.scss';

export const name = 'button';

export function disable() {}

export function enable($context) {
  $('#blah', $context).button('toggle');
}

export default enable;
