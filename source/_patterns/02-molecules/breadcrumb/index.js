/**
 * Breadcrumb
 */

// Module dependencies
import base from 'base';
import $ from 'jquery';

// Module styles
import './_breadcrumb.scss';

export default {
  name: 'breadcrumb',
  deps: [base, $],
  enable() {
    // Add custom JavaScript here
    // We'll need to add logic for 'active' and/or Drupal's 'is-active'
    // As well as attribute for aria-current
  },
  disable() {},
};
