/**
 * Apply the Design System to Pattern Lab DOM
 */

import $ from 'jquery';

// Prism highlighting in PL.
// Prism is kind of dumb and just operates globally.
import 'prismjs/components/prism-core.min';
import 'prismjs/components/prism-clike.min';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-twig.min';
import 'prismjs/components/prism-css.min';
import 'prismjs/components/prism-scss.min';
import 'prismjs/components/prism-markup.min';

// Local config
import { APP_NAME } from './config';
// Full design system. May dupe the above, but Webpack don't care.
import { enableAllComponents } from '../../source/default';

// Adds PL-only styles, ie color swatches.
import './scss/_styleguide.scss';
import './scss/_scss2json.scss';

// Watch the big pieces of PL like demos, _meta, data
import demoSystem from './glob';

// Send each component the $(document) as its context
const $context = $(document);

// Configure PL-specific settings here
const settings = {
  // card wants to know if it should enable holder.js.
  // BUILD_TARGET is either 'pl' or 'drupal', and comes from webpack
  enableHolder: BUILD_TARGET === APP_NAME,
  // a random drupalSetting
  color: 'orange',
};

// Just execute everything in the design system and pass in $(document), settings
enableAllComponents($context, settings);

// Not every demo will need be enabled, but some might.
Object.values(demoSystem).forEach(component => {
  if (Object.prototype.hasOwnProperty.call(component, 'enable')) {
    // console.log(component.name);
    component.enable($context, settings);
  }
});

// Remove a pl-only helper class to hide the pre-load spinner on the welcome page
$('body').removeClass('pl-loading');
