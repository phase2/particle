<?php

/**
 * @file
 * Functions to support theming menu navigation in the Particle theme.
 */

/**
 * Implements hook_preprocess_breadcrumb().
 */
function particle_preprocess_breadcrumb(&$variables) {
  if (($node = \Drupal::routeMatch()->getParameter('node')) && $variables['breadcrumb']) {
    $variables['breadcrumb'][] = [
      'text' => $node->getTitle(),
    ];
  }
}

/**
 * Implements hook_preprocess_menu_local_task().
 */
function particle_preprocess_menu_local_task(array &$variables) {
    //$variables['element']['#link']['url']->setOption('attributes', ['class'=>'rounded']);
}
