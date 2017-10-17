/**
 * Apply all our design system components to the DOM
 */
import $ from 'jquery';

import components from './design-system';

// Adds pattern lab only styles, ie color swatches.
require('./styleguide/_styleguide-specific.scss');

const $context = $(document);

// Let's just execute everything and pass in $(document)
components.forEach((component) => {
  component.enable($context);
  console.log(component);
});
