/**
 * Apply the Design System to Pattern Lab DOM
 */

import $ from 'jquery';
import _ from 'lodash';

// PL-only components, regardless of design system
import 'atoms/grid';

// Full design system. May dupe the above, but Webpack don't care.
import designSystem from '../../source/design-system';

// Watch all demo folders in source
import demoSystem from './demo/demos.glob';

// Adds PL-only styles, ie color swatches.
import './scss/_styleguide.scss';
import './scss/_scss2json.scss';

// Send each component the $(document) as its context
const $context = $(document);
// Configure PL-specific settings here
// Also useful for mocking behaviors from values that will come from drupalSettings
const settings = {
  // card wants to know if it should enable holder.js.
  // BUILD_TARGET is either 'pl' or 'drupal', and comes from webpack
  enableHolder: BUILD_TARGET === 'pl',
  // a random drupalSetting
  color: 'orange',
};

// Let's just execute everything and pass in $(document), settings
_.forEach(designSystem, (component) => {
  if (_.has(component, 'enable')) {
    console.log(component.name);
    component.enable($context, settings);
  }
});

// Not every demo will need enabled, but some might.
_.forEach(demoSystem, (component) => {
  if (_.has(component, 'enable')) {
    console.log(component.name);
    component.enable($context, settings);
  }
});

// Remove a pl-only helper class to hide the pre-load spinner on the welcome page.
$('body').removeClass('pl-loading');
