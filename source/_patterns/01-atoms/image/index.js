// Import custom sass, includes Bootstrap sass
import './_image.scss';

// Pull in system-wide images
import './logo.svg';

// Module templates
import './_image.twig';
import './_svg.twig';

export const name = 'image';

export function disable() {}

export function enable($context, { enableHolder }) {
  // Holder is only provided to PL, not Drupal. Like jQuery it's an IIFE
  // We can only conditionally import libraries using `require()`
  if (enableHolder) {
    require('holderjs'); // eslint-disable-line global-require
  }
}

export default enable;
