<?php

$filter = new Twig_SimpleFilter('clean_id', function ($string) {
  return $string;
});
