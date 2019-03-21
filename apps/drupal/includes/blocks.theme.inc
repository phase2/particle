<?php

/**
 * @file
 * Functions to support theming blocks in the Particle theme.
 */

use Drupal\particle\Particle;

/**
 * Implements hook_theme_suggestions_HOOK_alter().
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
 * Implements hook_preprocess_block().
 */
function particle_preprocess_block__system_branding_block(&$variables) {
  $logo_default = theme_get_setting('logo.use_default');
  $logo_url = theme_get_setting('logo.url');

  $logo_svg_theme = drupal_get_path('theme', Particle::THEME_NAME) . '/logo.svg';
  $logo_svg_assets = Particle::ASSETS_PATH . '/logo.svg';
  $logo_svg_inline = file_exists($logo_svg_assets) ? $logo_svg_assets : $logo_svg_theme;

  // Set the logo to PL if default.
  if ($logo_default) {
    $variables['logo_svg_inline'] = $logo_svg_inline;
    // Send to img if Logo is not an default.
  }
  else {
    $variables['logo_img_src'] = $logo_url;
  }
}
