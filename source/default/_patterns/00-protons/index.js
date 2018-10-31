/**
 * Base css generation and global js logic.
 */

import './_base.scss';

import enquire from 'enquire.js';
import $ from 'jquery';
import { mediaBreakpoint } from './utilities';

// Get the breakpoints set to :root by _bootstrap-overrides.scss.
const breakpointsString = $('html').css('--breakpoints');
const breakpoints = {};

if (breakpointsString) {
  breakpointsString.split(' ').forEach(breakpoint => {
    const value = $('html').css(`--breakpoint-${breakpoint}`);
    if (value) {
      breakpoints[breakpoint] = value;
    }
  });
}

// Example usage of the Enquire.js module JS breakpoints.
enquire.register(mediaBreakpoint.down(breakpoints.lg), {
  match: () => {
    console.log('Screen is below Large sized.');
  },
  unmatch: () => {
    console.log('Screen is above Large sized.');
  },
});

export default {
  GLOBAL_CONSTANT: 'blerp',
  GLOBAL_BREAKPOINTS: breakpoints,
};
