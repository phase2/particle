/**
 * Demo of svgicon. Pulls in svgicon assets, and provides demo-only assets.
 *
 * (This file is NOT imported by the design system, but is included as part of
 * a Pattern Lab app.)
 */

// Import component assets
import 'atoms/svgicon';

// Demo-only styles
import './_svgicon-demo.scss';

// Import demo assets
import twig from './svgicons.twig';
import yaml from './svgicons.yml';
import markdown from './svgicons.md';

export default {
  twig,
  yaml,
  markdown,
};
