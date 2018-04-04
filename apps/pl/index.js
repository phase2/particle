/**
 * Apply the Design System to Pattern Lab DOM
 */

import $ from 'jquery';
import _ from 'lodash';

// PL-only components, regardless of design system
import 'atoms/grid';

// Full design system. May dupe the above, but Webpack don't care.
import { enableAllComponents } from '../../source/design-system';

// Watch all demo folders in source
import demoSystem from './demo/demos.glob';
// Watch all files in the source/_data folder
import './demo/data.glob';

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

// Let's just execute everything in the design system and pass in $(document), settings
enableAllComponents($context, settings);

// Not every demo will need be enabled, but some might.
Object.values(demoSystem).forEach((component) => {
  if (_.has(component, 'enable')) {
    // console.log(component.name);
    component.enable($context, settings);
  }
});

// Remove a pl-only helper class to hide the pre-load spinner on the welcome page.
$('body').removeClass('pl-loading');
