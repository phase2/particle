<?php

/**
 * @file
 * Functions to support theming users in the Particle theme.
 */

/**
 * Implements hook_preprocess_user().
 */
function particle_preprocess_user(&$variables) {
  unset($variables['content']['member_for']);
}
