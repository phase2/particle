<?php

/**
 * @file
 * Functions to support theming blocks in the Particle theme.
 */
use Drupal\media\Entity\Media;
use Drupal\media_entity\MediaInterface;
use Drupal\file\Entity\File;
/**
 * Implements hook_theme_suggestions_block_alter().
 */

function particle_theme_suggestions_block_alter(&$suggestions, $variables) {
  foreach ($suggestions as &$suggestion) {
    $suggestion = str_replace('particle_', 'themag_', $suggestion);
  }

  $node = \Drupal::routeMatch()->getParameter('node');
  $nid = null;
  $nid2 = null;
    if ($node) {
    if($node instanceof \Drupal\node\NodeInterface)
    { $nid = $node->id();}
    if($node instanceof \Drupal\node\NodeInterface){
    $nid2 = $node->toUrl()->toString();
    }
    //$node->getTitle();
    }
  $word= 'node';
  if(strpos($nid2, $word) !== false){
    $suggestions[] = ('block__' . "_id_" . $nid . "_label_" . preg_replace('/\s+/', '_', $variables['elements']['#configuration']['label']));
  } else{
    $suggestions[] = ('block__'. str_replace('-', '_', ltrim($nid2, '/')) . "_id_" . $nid . "_label_" . preg_replace('/\s+/', '_', $variables['elements']['#configuration']['label']));
  }

  if (!empty($variables['elements']['content']['#block_content'])) {
    $block = $variables['elements']['content']['#block_content'];
    // Add `block--BLOCK-TYPE.html.twig`.
    $suggestions[] = 'block__' . $block->bundle();
    $view_mode = $variables['elements']['#configuration']['view_mode'];
    if (!empty($view_mode)) {
      // Add `block--BLOCK-TYPE--VIEW-MODE.html.twig`.
      $suggestions[] = 'block__' . $block->bundle() . '__' . $view_mode;
    }
  }


}

function particle_preprocess_block(&$variables) {

  if ($variables['plugin_id'] == 'entity_browser_block:employee_blocks') {

      $content = $variables['elements']['content'];

      $mediaId=$content[0]['#block_content']->get('field_employee_picture')->target_id;
      for ($index = 0; $index <= sizeof($content)-1; $index++) {
        $mediaIdtwo=$content[$index]['#block_content']->get('field_employee_picture')->target_id;
        $media_entity_loadtwo = Media::load($mediaIdtwo);
        $uritwo = $media_entity_loadtwo->field_image->entity->getFileUri();
        $variables['employeeimages'][$index] = $uritwo;
        $variables['field_employee_department'][$index] = $content[$index]['#block_content']->get('field_employee_department')->value;
        $variables['field_employee_email'][$index] = $content[$index]['#block_content']->get('field_employee_email')->value;
        $variables['field_employee_title'][$index] = $content[$index]['#block_content']->get('field_employee_title')->value;
        $variables['field_employee_first_name'][$index] = $content[$index]['#block_content']->get('field_employee_first_name')->value;
        $variables['field_employee_last_name'][$index] = $content[$index]['#block_content']->get('field_employee_last_name')->value;
        $variables['field_employee_office_location'][$index] = $content[$index]['#block_content']->get('field_employee_office_location')->value;
        $variables['field_employee_telephone'][$index] = $content[$index]['#block_content']->get('field_employee_telephone')->value;
        $variables['field_employee_website'][$index] = $content[$index]['#block_content']->get('field_employee_website')->view('url');

      }
  }

  if ($variables['plugin_id'] == 'entity_browser_block:department_info') {

    $content = $variables['elements']['content'];
    for ($index = 0; $index <= sizeof($content)-1; $index++) {
      $variables['blocktitle'][$index] = $content[$index]['#block_content']->info->value;
      $variables['field_utc_department_building'][$index] = $content[$index]['#block_content']->get('field_utc_department_building')->view('url');
      $variables['field_utc_department_street_addr'][$index] = $content[$index]['#block_content']->get('field_utc_department_street_addr')->view('url');
      $variables['field_utc_department_email'][$index] = $content[$index]['#block_content']->get('field_utc_department_email')->view('url');
      $variables['field_utc_department_fax_number'][$index] = $content[$index]['#block_content']->get('field_utc_department_fax_number')->view('url');
      $variables['field_utc_department_mail_code'][$index] = $content[$index]['#block_content']->get('field_utc_department_mail_code')->value;
      $variables['field_utc_department_phone'][$index] = $content[$index]['#block_content']->get('field_utc_department_phone')->view('url');
    }
  }
  

}