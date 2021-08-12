<?php

/**
 * @file
 * Functions to support theming miscellaneous things the Particle theme.
 */

// use Drupal\theme\custom\Particle\Particle;

/**
 * Implements hook_preprocess().
 */
// function particle_preprocess(&$variables) {
//   // Set the paths.assets variable globally, so that drupal can
//   // find webpack-compiled assets.
//   $variables['paths']['assets'] = Particle::ASSETS_PATH;
//   $variables['paths']['images'] = Particle::IMAGES_PATH;
//   $variables['paths']['fonts'] = Particle::FONTS_PATH;
//   $variables['paths']['svgs'] = Particle::SVGS_PATH;
// }

/**
 * Implements hook_page_attachments_alter().
 */
// function particle_page_attachments_alter(array &$page) {
//   // Tell IE to use latest rendering engine (not to use compatibility mode).
//   $ie_edge = [
//     '#type' => 'html_tag',
//     '#tag' => 'meta',
//     '#attributes' => [
//       'http-equiv' => 'X-UA-Compatible',
//       'content' => 'IE=edge',
//     ],
//   ];
//   $page['#attached']['html_head'][] = [$ie_edge, 'ie_edge'];
// }

/**
 * Implements hook_preprocess_details().
 */
// function particle_preprocess_details(array &$variables) {
//   $variables['attributes']['class'][] = 'details';
//   $variables['summary_attributes']['class'] = 'summary';
// }
/**
 * @param $variables
 */
 //add body class to error pages for background change
function particle_preprocess_html(&$variables)
{
    $statusCode = Drupal::request()->query->get('_exception_statuscode');
    if (isset($statusCode) and (($statusCode == 404) or ($statusCode == 403))) {
        $variables['attributes']['class'][] = 'page-' . $statusCode;
    }
}