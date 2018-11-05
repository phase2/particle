<?php

/**
 * @file
 */

use Michelf\MarkdownExtra;

$filter = new Twig_SimpleFilter('markdown', function ($string) {
  return MarkdownExtra::defaultTransform($string);
});
