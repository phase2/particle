<?php

namespace Drupal\particle_theme_utilities\Plugin\Preprocess;

use Drupal\preprocess\PreprocessPluginBase;

/**
 * Provides a base page preprocessor.
 */
class ParticlePage extends PreprocessPluginBase {

  /**
   * Provides a page preprocessor.
   *
   * @TODO Update `theme_name` below before use.
   * @Preprocess(
   *   id = "theme_name.page",
   *   hook = "page"
   * )
   */
  public function preprocess(array $variables): array {
    // Customize page variables.
    return $variables;
  }

}
