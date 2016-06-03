<?php

$filter = new Twig_SimpleFilter('format_date', function ($string) {
  return $string;
});
