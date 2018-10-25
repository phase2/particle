/**
 * Base css generation and global js logic.
 */

import './_base.scss';

// Import Pattern Lab-generated SCSS and Bootstrap variables for global usage.
import scssVariables from "../../_data/scssVariables.json";

// Exported variables and constants can be used by importing 'protons' to a
// container variable, then accessing.
export default {
  GLOBAL_CONSTANT: 'blerp',
  GLOBAL_BREAKPOINTS: scssVariables.scssBreakpoints,
  GLOBAL_COLORS: scssVariables.scssColors,
};
