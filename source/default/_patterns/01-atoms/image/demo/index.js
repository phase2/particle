/**
 * Demo of image. Pulls in image assets, and provides demo-only assets.
 *
 * (This file is NOT imported by the design system, but is included as part of
 * a Pattern Lab app.)
 */

// Import component assets
import 'atoms/image';

// Demo-only styles
import './_image-demo.scss';

// Holder JS for Demos Only.
import 'holderjs';

// Import demo only astrogoat.
import './astrogoat.png';

// Import demo assets
import twig from './images.twig';
import yaml from './images.yml';
import markdown from './images.md';

export default {
  twig,
  yaml,
  markdown,
};
