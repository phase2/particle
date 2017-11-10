<?php

$function = new Twig_SimpleFunction('faker', function ($string, $options="") {
  $faker = Faker\Factory::create();
  if ($options != "") {
    return $faker->$string($options);
  } else {
    return $faker->$string;
  }
});
