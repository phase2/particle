<?php

/**
 * @file
 * Functions to support theming forms in the Particle theme.
 */

declare(strict_types = 1);

use Drupal\Core\Form\FormStateInterface;

function particle_form_layout_builder_add_block_alter(array &$form, FormStateInterface $form_state): void {
  // Make the block title a hidden element and generate a UUID for the block
  // title if one is not already provided.
  $form['settings']['label']['#type'] = 'hidden';
  $uuid = Drupal::service('uuid')->generate();
  $label_default_value = $form['settings']['label']['#default_value'] ?: $uuid;
  $form['settings']['label']['#default_value'] = $label_default_value;

  // Make the label display checkbox hidden and always set the value to false.
  $form['settings']['label_display']['#type'] = 'hidden';
  $form['settings']['label_display']['#default_value'] = FALSE;
}
