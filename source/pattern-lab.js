/**
 * Apply all our design system components to the DOM
 */
import $ from 'jquery';

// Full design system
import designSystem from './design-system';

// PL needs grids regardless of if the component requires it
import './_patterns/01-atoms/grid';

// Adds PL-only styles, ie color swatches.
import './styleguide/_styleguide-specific.scss';

const $context = $(document);

// Let's just execute everything and pass in $(document)
designSystem.forEach((component) => {
  component.enable($context);
  console.log(component);
});
