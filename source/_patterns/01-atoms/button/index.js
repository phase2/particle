/**
 * Button
 */

import $ from 'jquery';
import 'bootstrap/js/dist/button';

// Custom
import 'protons';

// Module template
import './_button.twig';
import './_button-outline.twig';
import './_button-dropdown.twig';
import './_button-dropdown-split.twig';

// Import custom sass, includes Bootstrap sass
import './_button.scss';

export const name = 'button';

export function disable() {}

export function enable($context) {
  $('#blah', $context).button('toggle');
}

export default enable;
