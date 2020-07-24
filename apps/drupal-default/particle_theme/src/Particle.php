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

  /**
   * Provides breakpoints based on Tailwind Config.
   */
  const BREAKPOINTS = [
    'xs' => '0px',
    'sm' => '640px',
    'md' => '768px',
    'lg' => '1024px',
    'xl' => '1280px',
  ];

  /**
   * Provides spacing based on Tailwind Config.
   */
  const SPACING = [
    'px' => '1px',
    '0' => '0',
    '1' => '0.25rem',
    '2' => '0.5rem',
    '3' => '0.75rem',
    '4' => '1rem',
    '5' => '1.25rem',
    '6' => '1.5rem',
    '8' => '2rem',
    '10' => '2.5rem',
    '12' => '3rem',
    '16' => '4rem',
    '20' => '5rem',
    '24' => '6rem',
    '32' => '8rem',
    '40' => '10rem',
    '48' => '12rem',
    '56' => '14rem',
    '64' => '16rem',
  ];

}
