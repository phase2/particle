<?php

namespace Drupal\particle;

/**
 * Provides a primary particle class.
 */
class Particle {

  /**
   * Provides theme name constant.
   */
  const THEME_NAME = 'particle';

  /**
   * Provides the path for compiled Drupal assets in build system.
   */
  const ASSETS_PATH = 'themes/particle/dist/app-drupal/assets';
  const IMAGES_PATH = 'themes/particle/dist/app-drupal/assets/images';
  const FONTS_PATH = 'themes/particle/dist/app-drupal/assets/fonts';
  const SVGS_PATH = 'themes/particle/dist/app-drupal/assets/atomic/_patterns/01-atoms/svg/icons';

  /**
   * Provides the frontend docs for reference.
   */
  const FRONTEND_DOCS = 'https://phase2.github.io/frontend-docs/';

}
