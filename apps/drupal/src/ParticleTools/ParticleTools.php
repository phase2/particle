<?php

namespace Drupal\particle\ParticleTools;

/**
 * Provides utility functions for all preprocessors.
 *
 * This approach is influenced by Adventist's theme tools system.
 * For advanced examples including implementing custom services,
 *
 * @see https://bitbucket.org/phase2tech/adventist/src/develop/src/themes/ahs_theme/src/ThemeTools.php
 *
 */
class ParticleTools implements ParticleToolsInterface {

  /**
   * Return the theme path relative to the Drupal root.
   *
   * @return string
   *   The theme path.
   */
  public static function getThemePath() {
    return drupal_get_path('theme', self::THEME_NAME);
  }

  /**
   * Return the theme's assets path relative to the Drupal root.
   *
   * @return string
   *   The theme's assets path.
   */
  public static function getAssetsPath() {
    return self::getThemePath() . self::ASSETS_PATH;
  }

}
