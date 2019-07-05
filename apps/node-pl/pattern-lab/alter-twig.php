<?php

/**
 * @param Twig_Environment $env - The Twig Environment - https://twig.symfony.com/api/1.x/Twig_Environment.html
 * @param $config - Config of `@basalt/twig-renderer`
 *
 */
function addFilters(\Twig_Environment &$env, $config) {

  /**
   * Clean Class
   *
   * @return string
   */
  $clean_class = new Twig_SimpleFilter('clean_class', function ($string) {
    return $string;
  });
  $env->addFilter($clean_class);

  /**
   * Clean ID
   *
   * @return string
   */
  $clean_id = new Twig_SimpleFilter('clean_id', function ($string) {
    return $string;
  });
  $env->addFilter($clean_id);

  /**
   * Format Date
   *
   * @return string
   */
  $format_date = new Twig_SimpleFilter('format_date', function ($string) {
    return $string;
  });
  $env->addFilter($format_date);

  /**
   * Luma
   *
   * Take in an rgba associative array return a luminance value
   * according to ITU-R BT.709.
   *
   * @param array $rgba the associative array containing each color value. For example
   *              array(4) {
   *                ["r"] => int(0)
   *                ["g"] => int(123)
   *                ["b"] => int(255)
   *                ["a"] => int(1)
   *              }
   *
   * @return float
   */
  $luma = new Twig_SimpleFilter('luma', function ($rgba) {
    // Doesn't handle alpha, yet.
    return 0.2126 * $rgba['r'] + 0.7152 * $rgba['g'] + 0.0722 * $rgba['b'];
  });
  $env->addFilter($luma);

  /**
   * Placeholder
   *
   * @return string
   */
  $placeholder = new Twig_SimpleFilter('placeholder', function ($string) {
    return $string;
  });
  $env->addFilter($placeholder);

  /**
   * Drupal render filter.
   *
   * @return string
   */

  $render = new Twig_SimpleFilter('render', function ($string) {
    return $string;
  });
  $env->addFilter($render);

  /**
   * RGBA String
   *
   * @return string
   */
  $rgba_string = new Twig_SimpleFilter('rgba_string', function ($string) {
    $rgba = trim(str_replace(' ', '', $string));
    if (stripos($rgba, 'rgba') !== FALSE) {
      $res = sscanf($rgba, "rgba(%d, %d, %d, %f)");
    }
    else {
      $res = sscanf($rgba, "rgb(%d, %d, %d)");
      $res[] = 1;
    }

    return array_combine(array('r', 'g', 'b', 'a'), $res);
  });
  $env->addFilter($rgba_string);

  /**
   * Safe Join
   *
   * @return string
   */
  $safe_join = new Twig_SimpleFilter('safe_join', function ($string) {
    return $string;
  });
  $env->addFilter($safe_join);

  /**
   * Drupal translate filter.
   *
   * @return string
   */
  $t = new Twig_SimpleFilter('t', function ($string) {
    return $string;
  });
  $env->addFilter($t);

  /**
   * Without
   *
   * @return string
   */
  $without = new Twig_SimpleFilter('without', function ($string) {
    return $string;
  });
  $env->addFilter($without);

}

function addFunctions(\Twig_Environment &$env, $config) {

  /**
   * Link
   *
   */
  $link = new Twig_SimpleFunction(
    'link',
    function ($title, $url, $attributes) {
      if (isset($attributes) && isset($attributes['class'])) {
        $classes = join(' ', $attributes['class']);
        return '<a href="' . $url . '" class="' . $classes . '">' . $title . '</a>';
      }
      else {
        return '<a href="' . $url . '">' . $title . '</a>';
      }
    },
    array('is_safe' => array('html'))
  );
  $env->addFunction($link);

  /**
   * Path
   *
   */
  $path = new Twig_SimpleFunction('path', function ($string) {
    if ($string === '<front>') {
      return '/';
    }
    else {
      return $string;
    }
  });
  $env->addFunction($path);

  /**
   * URL
   *
   * Https://www.drupal.org/node/2486991.
   */
  $url = new Twig_SimpleFunction('url', function ($string) {
    return '#';
  });
  $env->addFunction($url);

}
