/**
 * svgicon
 */

import svg4everybody from 'svg4everybody';

// Module dependencies
import 'protons';

// Module styles
import './_svgicon.scss';

// Module template
import './_svgicon.twig';

export const name = 'svgicon';

export function disable() {}

export function enable() {
  svg4everybody();
}

export default enable;
