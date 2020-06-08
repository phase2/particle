<?php

namespace Drupal\particle_helper\Tools;

use Drupal\particle\Particle;

/**
 * Provides project specific functions for particle theme.
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
   * Return the theme's name.
   *
   * @return string
   *   The theme's name.
   */
  public static function getThemeName() {
    return Particle::THEME_NAME;
  }

}
