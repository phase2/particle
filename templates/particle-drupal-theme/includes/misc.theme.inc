<?php

/**
 * @file
 * Functions to support theming miscellaneous things the Particle theme.
 */

/**
 * Implements hook_page_attachments_alter().
 */
function particle_page_attachments_alter(array &$page) {
    // Tell IE to use latest rendering engine (not to use compatibility mode).
    /*$ie_edge = [
      '#type' => 'html_tag',
      '#tag' => 'meta',
      '#attributes' => [
      'http-equiv' => 'X-UA-Compatible',
      'content' => 'IE=edge',
      ],
    ];
    $page['#attached']['html_head'][] = [$ie_edge, 'ie_edge'];*/
}

/**
 * Implements hook_preprocess_details().
 */
function particle_preprocess_details(array &$variables) {
    /*$variables['attributes']['class'][] = 'details';
    $variables['summary_attributes']['class'] = 'summary';*/
}
