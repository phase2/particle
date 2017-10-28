/**
 * Card
 */


// Module dependencies
import base from '../../00-base';
import image from '../../01-atoms/image';
import button from '../../01-atoms/button';

// Module styles
import './_card.scss';

export default {
  name: 'card',
  deps: [base, image, button],
  enable: () => {
    // Holder is only provided to PL, not Drupal. Like jQuery it's an IIFE
    if (pl) {
      require('holderjs'); // eslint-disable-line global-require
    }
  },
  disable: () => {},
};
