<?php

namespace Drupal\particle_theme_utilities\Plugin\Preprocess;

use Drupal\preprocess\PreprocessPluginBase;

/**
 * Provides a node preprocessor.
 *
 * @TODO Update `theme_name` below before use.
 * @Preprocess(
 *   id = "theme_name.node",
 *   hook = "node"
 * )
 */
class ParticleNode extends PreprocessPluginBase {

  /**
   * {@inheritdoc}
   */
  public function preprocess(array $variables): array {
    // Add/customize node preprocess variables here.
    return $variables;
  }

}
