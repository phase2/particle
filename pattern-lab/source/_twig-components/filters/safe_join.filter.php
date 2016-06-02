<?php

$filter = new Twig_SimpleFilter('safe_join', function ($string) {
  return $string;
});
