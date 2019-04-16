<?php

/**
 * @file
 * Functions to support theming form layout in the Particle theme.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function particle_theme_suggestions_form_alter(array &$suggestions, array $variables) {
  $id = $variables['element']['#id'];
  // Particle Theme for Octane's Views Search and Drupal's Built-In Search.
  // This hook allows to apply two search block implementations to the same
  // theme file. Drupal only template file located at
  // /particle/apps/drupal/templates/form/form--particle-search.html.twig.
  if ($id == 'views-exposed-form-search-page' || $id == 'search-block-form') {
    $suggestions[] = 'form__particle_search';
  }
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function particle_form_alter(&$form, FormStateInterface $form_state, $form_id) {
  $id = $form['#id'];
  // Switch method to allow additional cases for these forms.
  // We are handling two cases for search block config from Octane and Drupal.
  // This switch syncs the two radically different render arrays.
  switch ($id) {
    case 'views-exposed-form-search-page':
      // Clean the unwanted label.
      unset($form['#info']['filter-search_api_fulltext']['label']);
      // The Search block from Views doesn't match Drupal's built-in form.
      // We are syncing them here to make sure they behave the same.
      // $form['keywords'] is the renderable array for Views Search input field.
      // Update Views Search input to Search type to avoid offset from input
      // button.
      $form['keywords']['#type'] = 'search';
      // Update the size of the search field to match Drupal's built-in Search.
      $form['keywords']['#size'] = 15;
      // Add the title to Views Search for screen readers.
      $form['keywords']['#title'] = t('Enter the terms you wish to search for.');
      // Set the title to invisible, which applies visually-hidden class for
      // screen reader.
      $form['keywords']['#title_display'] = 'invisible';
      // Add the Bootstrap class needed for input fields.
      $form['keywords']['#attributes']['class'] = ['form-control'];
      // Add the Bootstrap class to our Input button.
      $form['actions']['submit']['#attributes']['class'] = [
        'btn',
        'btn-outline-success',
      ];
      break;

    case 'search-block-form':
      // For Drupal's built-in Search, add classes.
      // $form['keys'] is the renderable array for Drupal's built-in Search
      // input field.
      // Add the Bootstrap class needed for input fields.
      $form['keys']['#attributes']['class'] = ['form-control'];
      // Add the Bootstrap class to our Input button.
      $form['actions']['submit']['#attributes']['class'] = [
        'btn',
        'btn-outline-success',
      ];
  }
}
