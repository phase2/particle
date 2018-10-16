<?php
// Drupal translate filter
$filter = new Twig_SimpleFilter('t', function ($string) {
  return $string;
});
