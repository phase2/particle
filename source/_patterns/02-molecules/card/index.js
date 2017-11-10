/**
 * Card
 */

// Module dependencies
import 'base';
import 'atoms/image';
import 'atoms/button';

// Module styles
import './_card.scss';

export const name = 'card';

export function disable() {}

export function enable($context, { enableHolder }) {
  // Holder is only provided to PL, not Drupal. Like jQuery it's an IIFE
  // We can only conditionally import libraries using `require()`
  if (enableHolder) {
    require('holderjs'); // eslint-disable-line global-require
  }
}

export default enable;
