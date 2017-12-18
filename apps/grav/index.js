/**
 * Apply the Design System to a single Grav behavior
 */

import $ from 'jquery';
import _ from 'lodash';

import designSystem from '../../source/design-system';

require('./scss/_grav-styles.scss');

console.log('grav-theme ran');

// Send each component the $(document) as its context
const $context = $(document);

// Let's just execute everything and pass in $(document), settings
_.forEach(designSystem, (component) => {
  console.log(component.name);
  component.enable($context);
});
