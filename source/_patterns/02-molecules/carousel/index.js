/**
 * Carousel
 */

import $ from 'jquery';
import 'bootstrap/js/src/util';
import 'bootstrap/js/src/carousel';

// Module dependencies
import 'base';
import 'atoms/image';

// Module styles
import './_carousel.scss';

export const name = 'carousel';

export function disable() {}

export function enable() {
  $('.carousel').carousel({
    interval: 3000,
  });
}

export default enable;
