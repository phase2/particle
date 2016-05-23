<?php

$function = new Twig_SimpleFunction('path', function ($string) {
  if ($string === '<front>') {
    return '/';
  } else {
    return $string;
  }
});
