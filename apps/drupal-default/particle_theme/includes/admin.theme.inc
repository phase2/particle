<?php

/**
 * @file
 * Functions to support theming admin in the Particle theme.
 */

function particle_preprocess_input(&$variables) {
  $variables['variant'] = (string) $variables['attributes']['type'];
}
