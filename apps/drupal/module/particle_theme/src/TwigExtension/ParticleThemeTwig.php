<?php

namespace Drupal\particle_theme\TwigExtension;

use Drupal\Core\Template\Attribute;

/**
 * {@inheritdoc}
 */
class ParticleThemeTwig extends \Twig_Extension {

  /**
   * {@inheritdoc}
   */
  public function getName() {
    return 'particle_theme_twig.twig_extension';
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
   *   Return a string of renderable attributes for particle.
   */
  public function attributify($attributes = []) {
    return new Attribute($attributes);
  }

}
