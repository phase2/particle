<?php

$function = new Twig_SimpleFunction(
    'link',
    function ($title, $url, $attributes) {
      if (isset($attributes) && isset($attributes['class'])) {
        $classes = join(' ', $attributes['class']);
        return '<a href="' . $url . '" class="' . $classes . '">' . $title . '</a>';
      } else {
        return '<a href="' . $url . '">' . $title . '</a>';
      }
    },
    array('is_safe' => array('html'))
);
