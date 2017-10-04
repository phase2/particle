/**
 * Apply all our design system components to the DOM
 */

import $ from 'jquery';
import _ from 'lodash';

import designSystem from './design-system';

const blerp = _.map([1, 3, 4], (num => num * 2));
console.log('blerp from pl.js', blerp);

const $context = $(document);

// Let's just execute everything and pass in $(document)
designSystem.forEach((component) => {
  component.enable($context);
});

console.log('hello from pattern-lab.js blerp');
