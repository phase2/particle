/**
 * Carousel
 */

import $ from 'jquery';
import 'bootstrap/js/dist/carousel';

// Module dependencies
import 'protons';
import 'atoms/image';

// Module template
import './_carousel.twig';

// Module styles
import './_carousel.scss';

export const name = 'carousel';

export const defaults = {
  interval: 3000,
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
export function enable($context, { carousel = {} }) {
  // Find carousel elements on the page
  const $carousel = $('.carousel', $context);
  // Bail if none exist
  if (!$carousel.length) {
    return;
  }
  // Override defaults with upstream settings
  const settings = Object.assign(defaults, carousel);
  // Initialize the carousel with (potentially) overridden settings
  $carousel.carousel({
    interval: settings.interval,
  });
}

export default enable;
