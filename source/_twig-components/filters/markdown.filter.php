<?php

$filter = new Twig_SimpleFilter('markdown', function ($string) {
  return \Michelf\MarkdownExtra::defaultTransform($string);
});
