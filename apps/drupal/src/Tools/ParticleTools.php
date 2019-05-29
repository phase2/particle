<?php

namespace Drupal\particle\Tools;

use Drupal\particle\Particle;

/**
 * Provides utility functions for all preprocessors.
 */
class ParticleTools {

  /**
   * Return the theme path relative to the Drupal root.
   *
   * @return string
   *   The theme path.
   */
  public static function getThemePath() {
    return drupal_get_path('theme', Particle::THEME_NAME);
  }

  /**
   * Return the theme's assets path relative to the Drupal root.
   *
   * @return string
   *   The theme's assets path.
   */
  public static function getAssetsPath() {
    return Particle::ASSETS_PATH;
  }

  /**
   * Return the theme's name.
   *
   * @return string
   *   The theme's name.
   */
  public static function getThemeName() {
    return Particle::THEME_NAME;
  }

}
