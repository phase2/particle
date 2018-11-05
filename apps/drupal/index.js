/**
 * Apply the Design System to a single Drupal behavior
 */
import { enableAllComponents } from '../../source/default';

require('./scss/_drupal-styles.scss');

console.log('Particle Drupal behaviors ran.');

Drupal.behaviors.designSystem = {
  attach($context, settings) {
    // Let's pretend we have a Drupal module called customCarouselModule that
    // provides a key on settings called `customCarouselModule` that has a key
    // called `interval`. Since this won't exist out of the box, we'll also
    // provide a default fallback object: { interval: 5000 }. Change this in
    // actual implementation.
    const { customCarouselModule = { interval: 5000 } } = settings;

    // Provide overrides to components from Drupal settings
    const componentSettings = {
      carousel: {
        interval: customCarouselModule.interval,
      },
      // .. other component overrides go here
    };

    // Now enable all components with a custom componentSettings object
    enableAllComponents($context, componentSettings);
  },
};
