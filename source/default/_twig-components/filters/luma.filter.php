<?php

/**
 * @file
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

$filter = new Twig_SimpleFilter('luma', function ($rgba) {
  // Doesn't handle alpha, yet.
  return 0.2126 * $rgba['r'] + 0.7152 * $rgba['g'] + 0.0722 * $rgba['b'];
});
