<?php

/**
 * @file
 * Implements hook_preprocess.
 */

/**
 *
 */
function particle_preprocess(&$variables, $hook) {

  // Check if the modules required by the theme are enabled.
  // =====================
  // Social Media Pages
  // =====================
  // Social media pages.
  $social_media_pages = [
    'facebook' => [
      'name' => 'Facebook',
      'fa_icon' => 'fab fa-facebook-f',
    ],
    'twitter' => [
      'name' => 'Twitter',
      'fa_icon' => 'fab fa-twitter',
    ],
    'google-plus' => [
      'namae' => 'Google+',
      'fa_icon' => 'fab fa-google-plus-g',
    ],
    'youtube' => [
      'name' => 'YouTube',
      'fa_icon' => 'fab fa-youtube',
    ],
    'instagram' => [
      'name' => 'Instagram',
      'fa_icon' => 'fab fa-instagram',
    ],
    'pinterest' => [
      'name' => 'Pinterest',
      'fa_icon' => 'fab fa-pinterest-p',
    ],
    'tumblr' => [
      'name' => 'Tumblr',
      'fa_icon' => 'fab fa-tumblr',
    ],
    'linked-in' => [
      'name' => 'LinkedIn',
      'fa_icon' => 'fab fa-linkedin-in',
    ],
    'snapchat' => [
      'name' => 'Snapchat',
      'fa_icon' => 'fab fa-snapchat-ghost',
    ],
  ];

  foreach ($social_media_pages as $page_key => $page) {
    $social_media_page_url = theme_get_setting('themag_' . $page_key);

    if (isset($social_media_page_url) && $social_media_page_url != "") {
      $variables['themag']['social_media_pages'][$page_key]['url'] = theme_get_setting('themag_' . $page_key);
      $variables['themag']['social_media_pages'][$page_key]['title'] = theme_get_setting('themag_' . $page_key . '_link_title');
      $variables['themag']['social_media_pages'][$page_key]['icon'] = '<i class="' . $page['fa_icon'] . '"></i>';
    }
  }



}
