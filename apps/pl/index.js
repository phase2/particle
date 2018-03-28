/**
 * Apply the Design System to Pattern Lab DOM
 */

import $ from 'jquery';
import _ from 'lodash';

// PL-only components, regardless of design system
import 'atoms/grid';
import * as demoPages from 'pages/demo';

// Full design system. May dupe the above, but Webpack don't care.
import designSystem from '../../source/design-system';

// Adds PL-only styles, ie color swatches.
import './scss/_styleguide.scss';
import './scss/_scss2json.scss';

// Watch all demo folders in source
import './demo/demos.glob';

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
  console.log(component.name);
  component.enable($context, settings);
});

// Not every demo will need enabled, but some might.
// As an example, this pattern in particular mocks Drupal page behaviors
// for Pattern Lab, so it needs enabled.
console.log(demoPages.name);
demoPages.enable($context, settings);
