<?php

/**
 * @file
 */

/**
 * Implements hook_page_attachments_alter().
 */
function particle_page_attachments_alter(array &$attachments) {

  /**
   * Attach custom CSS file
   */
  if (theme_get_setting('themag_use_custom_css_file')) {
    $attachments['#attached']['library'][] = 'particle/custom-css';
  }

  /**
   * Attach custom JS file
   */
  if (theme_get_setting('particle_use_custom_js_file')) {
    $attachments['#attached']['library'][] = 'particle/custom-js';
  }

}
