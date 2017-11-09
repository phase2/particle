/**
 * Apply the Design System app to a Drupal behavior
 */

import $ from 'jquery';
import _ from 'lodash';

import ds from '../source/design-system';

require('./scss/_drupal-styles.scss');

console.log('drupal-theme ran');

// Verifying that we have $
$('h1').html('hello from jquery');
// Verifying that we have _ available
_.forEach([1, 2, 3, 4], (num) => {
  console.log(num);
});

Drupal.behaviors.designSystem = {
  attach(context, settings) {
    ds.forEach((component) => {
      component.enable(context, settings);
    });
  },
};
