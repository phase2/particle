/**
 * Apply the Design System to a single Drupal behavior
 */
import { enableAllComponents } from '../../source/design-system';

require('./scss/_drupal-styles.scss');

console.log('drupal-theme ran');

Drupal.behaviors.designSystem = {
  attach($context, settings) {
    // Modify settings here as needed to meet requirements of components
    enableAllComponents($context, settings);
  },
};
