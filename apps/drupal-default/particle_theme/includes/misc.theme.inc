<?php

/**
 * @file
 * Functions to support theming miscellaneous things the Particle theme.
 */

/**
 * add body class to error pages for background change.
 */
function particle_preprocess_html(&$variables) {
  $statusCode = Drupal::request()->query->get('_exception_statuscode');
  if (isset($statusCode) and (($statusCode == 404) or ($statusCode == 403))) {
    $variables['attributes']['class'][] = 'page-' . $statusCode;
  }
}
