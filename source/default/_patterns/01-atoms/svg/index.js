/**
 * svg
 */

import $ from 'jquery';
import svg4everybody from 'svg4everybody';

// Module dependencies
import 'protons';
import fontawesome from './fontawesome';

// Module styles
import './_svg.scss';

// Module template
import './_svg.twig';
import './_svg--icon.twig';

// Enable Fontawesome immediately
fontawesome();

export const name = 'svg';

export const defaults = {
  dummyClass: 'js-svg-exists',
};

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
export function enable($context, { svg = {} }) {
  // Find our component within the DOM
  const $svg = $('.svg', $context);
  // Bail if component does not exist
  if (!$svg.length) {
    return;
  }

  // Enable svg4everybody.
  svg4everybody();

  // Merge defaults with incoming settings
  const settings = Object.assign(defaults, svg);
  // An example of what could be done with this component
  $svg.addClass(settings.dummyClass);
}

export default enable;
