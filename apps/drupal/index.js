/**
 * Apply the Design System to a single Drupal behavior
 */

import _ from 'lodash';

import designSystem from '../../source/design-system';

require('./scss/_drupal-styles.scss');

console.log('drupal-theme ran');

Drupal.behaviors.designSystem = {
  attach($context, settings) {
    _.forEach(designSystem, (component) => {
      console.log(component.name);
      component.enable($context, settings);
    });
  },
};
