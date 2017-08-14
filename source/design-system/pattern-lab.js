/**
 * Apply all our design system components to the DOM
 */

import $ from 'jquery';
import _ from 'lodash';

import designSystem from './design-system';

const blerp = _.map([1, 3, 4], (num => num));
console.log('blerp from pl.js');

const $context = $(document);

// Let's just execute everything and send over $(document)
designSystem.forEach((component) => {
  component.enable($context);
});
