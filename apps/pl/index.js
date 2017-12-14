/**
 * Apply the Design System to Pattern Lab DOM
 */

import $ from 'jquery';
import _ from 'lodash';

// PL-only components, regardless of design system
import 'atoms/grid';
import 'atoms/image/demo';
import * as homepage from 'pages/homepage';

// Full design system. May dupe the above, but Webpack don't care.
import designSystem from '../../source/design-system';

// Adds PL-only styles, ie color swatches.
import './scss/_styleguide.scss';
import './scss/_scss2json.scss';

// Send each component the $(document) as its context
const $context = $(document);
// Configure PL-specific settings here
const settings = {
  // card wants to know if it should enable holder.js.
  // BUILD_TARGET is either 'pl' or 'drupal', and comes from webpack
  enableHolder: BUILD_TARGET === 'pl',
};

// Let's just execute everything and pass in $(document), settings
_.forEach(designSystem, (component) => {
  console.log(component.name);
  component.enable($context, settings);
});

// PL-only components may need enabled as well!
homepage.enable();
