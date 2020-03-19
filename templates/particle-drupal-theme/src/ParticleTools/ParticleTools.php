<?php

namespace Drupal\particle\Tools;

use Drupal\particle\particle;

/**
 * Provides base utility functions for Particle theme.
 */
abstract class ParticleTools {

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
   * Return the theme's name.
   *
   * @return string
   *   The theme's name.
   */
  public static function getThemeName() {
    return Particle::THEME_NAME;
  }

}
