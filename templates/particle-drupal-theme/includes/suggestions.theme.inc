<?php

/**
 * @file
 * Functions to support adding suggestions to the Particle theme.
 */

/**
 * Implements hook_theme_suggestions_page_alter().
 */
function particle_theme_suggestions_page_alter(array &$suggestions, array $variables) {

}

/**
 * Implements hook_theme_suggestions_node_alter().
 */
function particle_theme_suggestions_node_alter(array &$suggestions, array $variables) {
    /*$node = $variables['elements']['#node'];

    if ($variables['elements']['#view_mode'] == "full") {

    }*/
}

/**
 * Implements hook_theme_suggestions_block_alter().
 */
function particle_theme_suggestions_block_alter(array &$suggestions, array $variables) {
    // Provide suggestion for block templates by custom block type.
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
 * Implements hook_theme_suggestions_field_alter().
 */
function particle_theme_suggestions_field_alter(array &$suggestions, array $variables) {
    /*$element = $variables['element'];
    $suggestions[] = 'field__' . $element['#view_mode'];
    $suggestions[] = 'field__' . $element['#view_mode'] . '__' . $element['#field_name'];*/
}

/**
 * Implements hook_theme_suggestions_field_alter().
 */
function particle_theme_suggestions_fieldset_alter(array &$suggestions, array $variables) {
    /*$element = $variables['element'];
    if (isset($element['#attributes']['class']) && in_array('form-composite', $element['#attributes']['class'])) {
      $suggestions[] = 'fieldset__form_composite';
    }*/
}

/**
 * Implements hook_theme_suggestions_details_alter().
 */
function particle_theme_suggestions_details_alter(array &$suggestions, array $variables) {

}

/**
 * Implements hook_theme_suggestions_image_alter().
 */
function particle_theme_suggestions_image_alter(array &$suggestions, array $variables) {
    $node = \Drupal::request()->attributes->get('node');
    if (!empty($node)) {
        $suggestions[] = 'image__' . $node->getType();
    }
}
