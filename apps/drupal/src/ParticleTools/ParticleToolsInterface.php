<?php

namespace Drupal\particle\ParticleTools;

/**
 * Provides a tools interface for theme preprocessing.
 *
 */
interface ParticleToolsInterface {

  /**
   * Provides theme name constant.
   *
   */
  const THEME_NAME = 'particle';

  /**
   * Provides the path for compiled Drupal assets in build system.
   *
   */
  const ASSETS_PATH = '/../../dist/assets';

}
