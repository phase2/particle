/**
 * Demo of <%= camelCaseName %>. Pulls in <%= camelCaseName %> assets, and provides demo-only assets.
 *
 * This file is NOT imported by design-system.js, but is included as part of particle/apps/pl/index.js
 */

// Import component assets
import '<%= patternType %>/<%= camelCaseName %>';

// Import demo assets
import twig from './<%= name %>s.twig';
import yaml from './<%= name %>s.yml';

export default {
  twig,
  yaml,
};