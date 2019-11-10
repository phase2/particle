/**
 * Demo of svg. Pulls in svg assets, and provides demo-only assets.
 *
 * (This file is NOT imported by the design system, but is included as part of
 * a Pattern Lab app.)
 */

// Import component assets
import 'atoms/svg';

// Demo-only styles
import './_svg--icon-demo.scss';

// Import demo assets
import twig from './svgs.twig';
import yaml from './svgs.yml';
import markdown from './svgs.md';

export default {
  twig,
  yaml,
  markdown,
};
