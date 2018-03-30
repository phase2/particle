/**
 * Apply the Design System to a single Grav behavior
 */

import $ from 'jquery';

import { enableAllComponents } from '../../source/design-system';

require('./scss/_grav-styles.scss');

console.log('grav-theme ran');

// Let's just execute everything and pass in $(document), settings
enableAllComponents($(document));
