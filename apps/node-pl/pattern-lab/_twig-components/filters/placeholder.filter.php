<?php

/**
 * @file
 */

$filter = new Twig_SimpleFilter('placeholder', function ($string) {
  return $string;
});
