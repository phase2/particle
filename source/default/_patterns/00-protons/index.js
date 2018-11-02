/**
 * Base css generation and global js logic.
 */

import $ from 'jquery';
import enquire from 'enquire.js';

import { mediaBreakpoint } from './utilities';

import './_base.scss';

const $root = $(':root');

// Get the breakpoints set to :root by _bootstrap-overrides.scss.
const breakpointsString = $root.css('--breakpoints');
let breakpoints = {};

// Map the breakpoints to the Sass variables also stored in :root
if (breakpointsString) {
  breakpoints = breakpointsString.split(', ').reduce(
    (bps, bp) => ({
      ...bps,
      [bp]: $root.css(`--breakpoint-${bp}`),
    }),
    {}
  );
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

// Export global variables.
export default {
  GLOBAL_CONSTANT: 'blerp',
  GLOBAL_BREAKPOINTS: breakpoints,
};
