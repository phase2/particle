import $ from 'jquery';

import { card } from './design-system';

const $context = $(document);

// Let's just execute everything and send over $(document)
designSystem.forEach((component) => {
  component.enable($context);
});
