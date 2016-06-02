<?php

$filter = new Twig_SimpleFilter('without', function ($string) {
  return $string;
});
