/**
 * Demo of footer. Pulls in footer assets, and provides demo-only assets.
 *
 * This file is NOT imported by design-system.js, but is included as part of apps/pl/index.js
 */

// Import component assets
import 'organisms/footer';

// Import demo assets
import twig from './footers.twig';
import yaml from './footers.yml';
import markdown from './footers.md';

export default {
  twig,
  yaml,
  markdown,
};
