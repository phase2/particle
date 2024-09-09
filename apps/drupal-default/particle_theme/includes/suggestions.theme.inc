<?php

/**
 * @file
 * Functions to support adding suggestions to the Particle theme.
 */

/**
 * Implements hook_theme_suggestions_field_alter().
 */
function particle_theme_suggestions_field_alter(array &$suggestions, array $variables) {
  $element = $variables['element'];
  $suggestions[] = 'field__' . $element['#view_mode'];
  $suggestions[] = 'field__' . $element['#view_mode'] . '__' . $element['#field_name'];
}

/**
 * Implements hook_theme_suggestions_field_alter().
 */
function particle_theme_suggestions_fieldset_alter(array &$suggestions, array $variables) {
  $element = $variables['element'];
  if (isset($element['#attributes']['class']) && in_array('form-composite', $element['#attributes']['class'])) {
    $suggestions[] = 'fieldset__form_composite';
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 *
 * @TODO evaluate for Search.
 */
function particle_theme_suggestions_form_alter(array &$suggestions, array $variables) {
  $id = $variables['element']['#id'];
  // Particle Theme for Octane's Views Search and Drupal's Built-In Search.
  // This hook allows to apply two search block implementations to the same
  // theme file. Drupal only template file located at
  // /Particle/apps/drupal-default/templates/form/form--particle-search.html.twig.
  if ($id == 'views-exposed-form-search-page' || $id == 'search-block-form') {
    $suggestions[] = 'form__particle-search';
  }
}
