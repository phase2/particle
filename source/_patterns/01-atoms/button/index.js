// Import button js from Bootstrap
import { Button } from 'bootstrap/js/src';

// Import our custom sass, includes Bootstrap sass
import base from '../../00-base/base';
import './button.scss';

// Custom logic for buttons here

export default {
  name: 'button',
  deps: [base, Button],
  enable: () => {
    console.log('Button js ran!');
  },
  disable: () => {},
};
