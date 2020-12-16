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

function particle_theme_suggestions_block_alter(&$suggestions, $variables)
{
    foreach ($suggestions as &$suggestion) {
        $suggestion = str_replace('particle_', 'themag_', $suggestion);
    }

    $node = \Drupal::routeMatch()->getParameter('node');
    $nid = null;
    $node_url_string = null;
    if ($node) {
        if ($node instanceof \Drupal\node\NodeInterface) {
            $nid = $node->id();
        }
        if ($node instanceof \Drupal\node\NodeInterface) {
            $node_url_string = $node->toUrl()->toString();
        }
        //$node->getTitle();
    }
    $word= 'node';
    if (strpos($node_url_string, $word) !== false) {
        $suggestions[] = ('block__' . "_id_" . $nid . "_label_" . preg_replace('/\s+/', '_', $variables['elements']['#configuration']['label']));
    } else {
        $suggestions[] = ('block__'. str_replace('-', '_', ltrim($node_url_string, '/')) . "_id_" . $nid . "_label_" . preg_replace('/\s+/', '_', $variables['elements']['#configuration']['label']));
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

function particle_preprocess_block(&$variables)
{
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
    if ($variables['plugin_id'] == 'inline_block:utc_library_embed_widget') {
        $content = $variables['elements']['content'];

        $embed_widget = "https://liblab.utc.edu/".$content['#block_content']->get('field_utclib_embed_source')->value;
        $append_date =  date("YmdH");
        if (strpos($embed_widget, '?') !== false) {
            $php_url = $embed_widget."&v=".$append_date;
        } else {
            $php_url = $embed_widget."?v=".$append_date;
        }
        $variables['#attached']['drupalSettings']['utclibEmbedSource'] = "none";
        if (!function_exists("file_get_contents_curl")) {
            function file_get_contents_curl($url)
            {
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_AUTOREFERER, true);
                curl_setopt($ch, CURLOPT_HEADER, 0);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
                curl_setopt($ch, CURLOPT_TIMEOUT, 10); //timeout in seconds
                $data = curl_exec($ch);
                curl_close($ch);
                return $data;
            }
        }
        $variables['embed_content'] = file_get_contents_curl($php_url);
    }

  if ($variables['plugin_id'] == 'inline_block:utc_library_chat_widget') {
    $content = $variables['elements']['content'];
    $chat_id = $content['#block_content']->get('field_utclib_chat_id')->value;
    $variables['#attached'] = [
      'drupalSettings' => [
        'myLibrary' => [
          'chat_id' => $chat_id,
        ],
      ],
    ];
  }
}
