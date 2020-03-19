<?php

/**
 * @file
 * Functions to support theming layouts in the Particle theme.
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function particle_preprocess_page(&$variables) {
  // Themes are not able to declare module dependencies at this time.
  // We use this as a shortcut to guarantee the component library module exists.
  $moduleHandler = \Drupal::service('module_handler');
  if ($moduleHandler->moduleExists('components')) {
    $variables['has_components_module'] = TRUE;
  }
}

/**
 * Implements hook_preprocess_HOOK() for html.html.twig.
 */
function particle_preprocess_html(array &$variables) {
    /* Add class to html tag */
    //$variables['html_attributes']->addClass('no-js');

    // Don't display the site name twice on the front page (and potentially others)
    /*if (isset($variables['head_title_array']['title']) && isset($variables['head_title_array']['name']) && ($variables['head_title_array']['title'] == $variables['head_title_array']['name'])) {
      $variables['head_title'] = $variables['head_title_array']['name'];
    }*/
}
