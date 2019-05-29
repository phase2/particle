/**
 * Demo of <%= camelCaseName %>. Pulls in <%= camelCaseName %> assets, and provides demo-only assets.
 *
 * (This file is NOT imported by the design system, but is included as part of
 * a Pattern Lab app.)
 */

// Import component assets
import '<%= cleanPatternType %>/<%= name %>';

// Import demo assets
import twig from './<%= name %>s.twig';

export default {
  twig,
};
