/**
 * Example JS widget
 *
 * An example of a testable, standalone, javascript-driven widget that makes an api call, writes
 * HTML, and does basic logic. This is a pretty naive re-render-on-data-change approach, using
 * poor-man's Redux and jQuery
 *
 * Note the use of this file (`example-widget/index.js`) as the "implementation" of the actual
 * javascript application that resides in `example-widget/src/index.js`.
 */
import $ from 'jquery';

import 'protons';
import 'molecules/card';

// Module template
import './_example-widget.twig';

// Module styles
import './_example-widget.scss';

import exampleWidget from './src';

export const name = 'example-widget';

export function disable() {}

export function enable($context) {
  // We have to glue this app to some piece of DOM
  exampleWidget($('#js-example-widget', $context));
}

export default enable;
