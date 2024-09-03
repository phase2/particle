<?php

/**
 * @file
 * Functions to support theming blocks in the Particle theme.
 */

use Drupal\node\NodeInterface;

/**
 * Implements hook_theme_suggestions_block_alter().
 */
function particle_theme_suggestions_block_alter(&$suggestions, $variables) {
  foreach ($suggestions as &$suggestion) {
    $suggestion = str_replace('particle_', 'themag_', $suggestion);
  }

  $node = \Drupal::routeMatch()->getParameter('node');
  $node_bundle = NULL;
  if ($node) {
    if ($node instanceof NodeInterface) {
      $node_bundle = $node->bundle();
    }
  }
  if ($variables['elements']['#base_plugin_id'] == 'system_breadcrumb_block') {
    $suggestions[] = 'block__' . $variables['elements']['#base_plugin_id'] . "_" . $node_bundle;
  }

  if (!empty($variables['elements']['content']['#block_content'])) {
    $block = $variables['elements']['content']['#block_content'];
    // Add `block--BLOCK-TYPE.html.twig`.
    $suggestions[] = 'block__' . $block->bundle();

    $view_mode = $variables['elements']['#configuration']['view_mode'];
    if (!empty($view_mode)) {
      // Add `block--BLOCK-TYPE--VIEW-MODE.html.twig`.
      $suggestions[] = 'block__' . $block->bundle() . '__' . $view_mode;
    }
  }
}

/**
 * Implements hook_preprocess_block().
 */
function particle_preprocess_block(&$variables) {
  if ($variables['plugin_id'] == 'entity_browser_block:department_info') {
    $content = $variables['elements']['content'];
    for ($index = 0; $index <= count($content) - 1; $index++) {
      $variables['blocktitle'][$index] = $content[$index]['#block_content']->info->value;
      $variables['field_utc_department_building'][$index] = $content[$index]['#block_content']->get('field_utc_department_building')->view('url');
      $variables['field_utc_department_street_addr'][$index] = $content[$index]['#block_content']->get('field_utc_department_street_addr')->view('url');
      $variables['field_utc_department_email'][$index] = $content[$index]['#block_content']->get('field_utc_department_email')->view('url');
      $variables['field_utc_department_fax_number'][$index] = $content[$index]['#block_content']->get('field_utc_department_fax_number')->view('url');
      $variables['field_utc_department_mail_code'][$index] = $content[$index]['#block_content']->get('field_utc_department_mail_code')->value;
      $variables['field_utc_department_phone'][$index] = $content[$index]['#block_content']->get('field_utc_department_phone')->view('url');
    }
  }

}
