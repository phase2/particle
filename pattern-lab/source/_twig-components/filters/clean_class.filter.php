<?php

$filter = new Twig_SimpleFilter('clean_class', function ($string) {
  return $string;
});
