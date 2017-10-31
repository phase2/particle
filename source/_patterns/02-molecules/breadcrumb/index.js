/**
 * Breadcrumb
 */

// Module dependencies
import base from 'base';

// Module styles
import './_breadcrumb.scss';

export default {
  name: 'breadcrumb',
  deps: [base],
  enable($context, { enableHolder }) {
    // Holder is only provided to PL, not Drupal. Like jQuery it's an IIFE
    // We can only conditionally import libraries using `require()`
    if (enableHolder) {
      require('holderjs'); // eslint-disable-line global-require
    }
  },
  disable() {},
};
