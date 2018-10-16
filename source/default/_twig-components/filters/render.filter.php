<?php
// Drupal render filter
$filter = new Twig_SimpleFilter('render', function ($string) {
  return $string;
});
