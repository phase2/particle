<?php

/**
 * @file
 * Functions to support theming miscellaneous things the Particle theme.
 */

use Drupal\particle\Tools\ParticleTools;

/**
 * Implements hook_preprocess().
 */
function particle_preprocess(&$variables) {
  // Set the paths.assets variable globally, so that drupal can
  // find webpack-compiled assets.
  $variables['paths']['assets'] = ParticleTools::getAssetsPath();
}

/**
 * Implements hook_preprocess_user().
 */
function particle_preprocess_user(&$variables) {
  unset($variables['content']['member_for']);
}
