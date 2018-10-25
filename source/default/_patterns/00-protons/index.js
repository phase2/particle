/**
 * Base css generation and global js logic.
 */

import './_base.scss';

import { mediaBreakpoint } from 'protons/utilities';
import scssVariables from '../../_data/scssVariables.json';

import enquire from '../../../node_modules/enquire.js';

export function enable() {
  // Example usage of the Enquire.js module JS breakpoints.
  const { GLOBAL_BREAKPOINTS } = scssVariables;

  enquire.register(mediaBreakpoint.down(GLOBAL_BREAKPOINTS.lg), {
    match: () => {
      console.log('Screen is below Large sized.');
    },
    unmatch: () => {
      console.log('Screen is above Large sized.');
    },
  });
}

// Exported variables and constants can be used by importing 'protons' to a
// container variable, then accessing.
export default {
  GLOBAL_CONSTANT: 'blerp',
  GLOBAL_BREAKPOINTS: scssVariables.scssBreakpoints,
  GLOBAL_COLORS: scssVariables.scssColors,
};
