<?php

/**
 * @file
 */

$filter = new Twig_SimpleFilter('rgba_string', function ($string) {
  $rgba = trim(str_replace(' ', '', $string));
  if (stripos($rgba, 'rgba') !== FALSE) {
    $res = sscanf($rgba, "rgba(%d, %d, %d, %f)");
  }
  else {
    $res = sscanf($rgba, "rgb(%d, %d, %d)");
    $res[] = 1;
  }

  return array_combine(array('r', 'g', 'b', 'a'), $res);
});
