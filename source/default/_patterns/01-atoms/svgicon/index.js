/**
 * SVG icons
 */

import svg4everybody from 'svg4everybody';

// Module dependencies
import 'protons';
import fontawesome from './fontawesome';

// Module styles
import './_svgicon.scss';

// Module template
import './_svgicon.twig';

// Enable Fontawesome immediately
fontawesome();

export const name = 'svgicon';

export function disable() {}

export function enable() {
  svg4everybody();
}

export default enable;
