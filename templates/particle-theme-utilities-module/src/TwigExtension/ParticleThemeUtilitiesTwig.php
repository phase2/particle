<?php

namespace Drupal\particle_theme_utilities_module\TwigExtension;

use Drupal\Core\Template\Attribute;

/**
 * {@inheritdoc}
 */
class ParticleThemeUtilitiesTwig extends \Twig_Extension {

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'particle_theme.twig_extension';
  }

  /**
   * {@inheritdoc}
   */
  public function getFilters() {
    return [
      new \Twig_SimpleFilter('attributify', [$this, 'attributify'], ['is_safe' => ['html']]),
    ];
  }

  /**
   * Filter to combine simple html attributes.
   *
   * @param array|string $attributes
   *   A collection of html safe items to concat into attributes string.
   *
   * @return string
   *   Return a string of renderable attributes for theme.
   */
  public function attributify($attributes = []) {
    return new Attribute($attributes);
  }

}
