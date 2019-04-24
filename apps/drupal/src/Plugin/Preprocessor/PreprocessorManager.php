<?php

namespace Drupal\particle\Plugin\Preprocessor;

use Drupal\Core\Entity\EntityInterface;
use Drupal\particle\Tools\ParticleTools;

/**
 * Provides a theme preprocessor manager for Class based theme preprocessors.
 *
 * Drupal core does not provide built-in plugin support for theme files.
 * The plugin discovery might before the front end theme is not active.
 *
 * The approach here is to use Drupal's State API to handle Preprocessor Class.
 * New suggestions are read on page load and added to State API via STATE_ID.
 * The Preprocessor Class Map is stored in cache and refreshed on change.
 *
 */
class PreprocessorManager {

  /**
   * The State API ID for this Manager.
   *
   * @var string
   */
  const STATE_ID = 'preprocessor.map';

  /**
   * Appended suggestions.
   *
   * @see getSuggestions()
   *
   * @var array
   */
  protected static $allSuggestions = [];

  /**
   * Cached Preprocessor instances.
   *
   * @see load()
   *
   * @var array
   */
  protected static $preprocessorInstances = [];

  /**
   * Particle tools instance for all preprocessors.
   *
   * @var Drupal\particle\Tools\ParticleTools
   *   Particle's suite of helper functions and utilities.
   */
  protected static $tools;

  /**
   * Returns the tools object.
   *
   * @return Drupal\particle\Tools\ParticleTools
   *   The tools object.
   */
  public static function getTools() {
    if (!isset(static::$tools)) {
      static::$tools = new ParticleTools();
    }

    return static::$tools;
  }

  /**
   * Returns the full path to the directory of the preprocessor classes.
   *
   * Base should be the only root level preprocessor in this directory.
   * All other types should be located in subdirectories.
   *
   * @see getPreprocessors()
   *
   * @return string
   *   The directory path.
   */
  public static function getPreprocessorsDirectory() {
    return __DIR__ . '/Preprocessors';
  }

  /**
   * Get the preprocessors from directory and subdirectories.
   *
   * @return array
   *   An array of preprocessors from the file system.
   */
  public static function getPreprocessors() {
    $preprocessors = &drupal_static(__FUNCTION__);
    if (is_null($preprocessors)) {
      $directory = scandir(static::getPreprocessorsDirectory());
      // Remove Base, '.' and '..' values and return directory names.
      $types = array_slice($directory, 3);
      foreach ($types as $type) {
        $items = scandir(static::getPreprocessorsDirectory() . '/' . $type);
        foreach ($items as $item) {
          if (!is_dir($item)) {
            $item = str_replace('.php', '', $item);
            $preprocessors[$item] = $type;
          }
        }
      }
    }

    return isset($preprocessors) ? $preprocessors : [];
  }

  /**
   * Get the preprocessor class map from State API or in memory store.
   *
   * @return array
   *   Array of keys of preprocess name and values of full class path or empty.
   */
  public static function getPreprocessorsClassMap() {
    $preprocessor_map = &drupal_static(__FUNCTION__);
    if (is_null($preprocessor_map)) {
      $preprocessor_map = \Drupal::state()->get(static::STATE_ID);
      if ($preprocessor_map && is_array($preprocessor_map)) {
        return $preprocessor_map;
      }
    }

    return isset($preprocessor_map) ? $preprocessor_map : [];
  }

  /**
   * Merge suggestions with a matching Preprocessor Class into Preprocessor Map.
   *
   * @param array $suggestions
   *   The suggestions from Drupal.
   *
   * @param array $preprocessor_map
   *   The cached state api map.
   *
   * @return array
   *   Merged Map combination of original Map and Classes.
   */
  public static function mergedMaps(array $suggestions, array $preprocessor_map) {
    $map = [];
    // If the Processor Matches a Suggestion, Merge into Preprocessor Map.
    if ($preprocessors = static::getPreprocessors()) {
      foreach ($preprocessors as $preprocessor => $type) {
        if (!is_dir($preprocessor)) {
          $key = array_search(strtolower($preprocessor), $suggestions);
          if ($key) {
            $map[$key] = __NAMESPACE__ . '\\Preprocessors' . '\\' . $type . '\\' . $preprocessor;
          }
        }
      }
    }

    return array_unique(array_merge($preprocessor_map, $map));
  }

  /**
   * Make the preprocessor class map.
   *
   * @param array $preprocessor_map
   *   The cached state api map.
   *
   * @param array $new_suggestions
   *   The suggestions from Drupal.
   *
   * @return array
   *   An array with keys of preprocess name and values of full class path.
   */
  public static function makePreprocessorsClassMap(array $preprocessor_map, array $new_suggestions = []) {
    // Initialize Preprocessors Map with Base.
    if (!array_key_exists('default', $preprocessor_map)) {
      $map['default'] = __NAMESPACE__ . '\\Preprocessors\\Base';
      drupal_static_reset();
      \Drupal::state()->set(static::STATE_ID, $map);
      $preprocessor_map = static::getPreprocessorsClassMap();
    }

    // If we have new suggestions, try to update the preprocessor map state.
    if (!empty($new_suggestions)) {
      $new_maps = static::mergedMaps($new_suggestions, $preprocessor_map);
      asort($new_maps);
      asort($preprocessor_map);
      if (!empty($new_maps) && $new_maps !== $preprocessor_map) {
        // If we have new maps, reset the static class map.
        drupal_static_reset();
        \Drupal::state()->set(static::STATE_ID, $new_maps);
        $preprocessor_map = static::getPreprocessorsClassMap();
      }
    }

    // Return the map state to use as the new map.
    return $preprocessor_map;
  }

  /**
   * Create an instance of the preprocessor class.
   *
   * @param string $id
   *   The plugin id. Example: 'node__caption_block'.
   *
   * @return \Drupal\particle\Plugin\Preprocessor\PreprocessorInterface|null
   *   A cached instance of the preprocessor.
   */
  public static function load($id) {
    if (array_key_exists($id, static::$preprocessorInstances)) {
      // Instance cached.
      return static::$preprocessorInstances[$id];
    }

    $preprocessor_map = static::getPreprocessorsClassMap();
    if (isset($preprocessor_map[$id]) && class_exists($preprocessor_map[$id])) {
      $instance = NULL;
      try {
        $instance = new $preprocessor_map[$id](static::getTools());
      }
      catch (\Exception $error) {
        // Pass and let fail and log.
        \Drupal::logger(ParticleTools::getThemeName())->error($error);
      }

      // Found instance, update cache.
      if (isset($instance)) {
        static::$preprocessorInstances[$id] = $instance;
        return static::$preprocessorInstances[$id];
      }
    }

    return NULL;
  }

  /**
   * Load an instance of the preprocessor class by theme variables.
   *
   * @param string $hook
   *   The preprocess hook name. Example: 'node' for hook_preprocess_node.
   *
   * @param array $variables
   *   The preprocess variables to alter.
   *
   * @return \Drupal\particle\Plugin\Preprocessor\PreprocessorInterface|null
   *   A cached instance of the preprocessor.
   */
  public static function loadByVariables($hook, array &$variables = []) {

    $suggestions = static::getSuggestions($hook, $variables);
    $preprocessor_map = static::getPreprocessorsClassMap();

    $new_suggestions = [];
    foreach ($suggestions as $suggestion) {
      // If the suggestion as an id is not in the map,
      if (!array_key_exists($suggestion, $preprocessor_map)) {
        // We may have a new preprocessor - prepare for comparison and merge.
        $new_suggestions[$suggestion] = str_replace('_', '', $suggestion);
      }
    }

    if (!empty($new_suggestions)) {
      $preprocessor_map = static::makePreprocessorsClassMap($preprocessor_map, $new_suggestions);
    }

    // After determining updated maps, reduce the suggestions to matches.
    $possible_suggestions = array_values(array_intersect($suggestions, array_keys($preprocessor_map)));
    foreach ($possible_suggestions as $suggestion) {
      $instance = static::load($suggestion);
      if (isset($instance)) {
        return $instance;
      }
    }

    // Fallback default class so that calls to load() can be chained.
    $instance = static::load('default');
    if (isset($instance)) {
      return $instance;
    }

    return NULL;
  }

  /**
   * Loads a preprocessor for the given variables.
   *
   * @param array $properties
   *   An array with the following options currently supported:
   *   - hook (required if no entity_type).
   *   - entity_type (required if no hook).
   *   - bundle: The entity bundle.
   *   - view_mode: The entity view mode.
   *
   * @return \Drupal\particle\Plugin\Preprocessor\PreprocessorInterface|null
   *   An instance of the theme preprocessor.
   */
  public static function loadByProperties(array $properties) {
    $ids = [];

    if (!empty($properties['hook'])) {
      $ids[] = $properties['hook'];
    }

    if (!empty($properties['entity_type'])) {
      $ids[] = $properties['entity_type'];
    }

    if (!empty($ids)) {
      if (!empty($properties['bundle'])) {
        $ids[] = $properties['bundle'];
      }

      if (!empty($properties['view_mode'])) {
        $ids[] = $properties['view_mode'];
      }

      $id = implode('__', $ids);
      return static::load($id);
    }

    return NULL;
  }

  /**
   * Loads a preprocessor by entity.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The entity to preprocess.
   * @param string $view_mode
   *   The entity view mode.
   *
   * @return \Drupal\particle\Plugin\Preprocessor\PreprocessorInterface|null
   *   An instance of the theme preprocessor.
   */
  public static function loadByEntity(EntityInterface $entity, $view_mode = NULL) {
    $entity_type = $entity->getEntityTypeId();
    if (empty($entity_type)) {
      return null;
    }

    // Build vars with minimum expected in getSuggestions().
    $variables = [
      $entity_type => $entity,
      'view_mode' => $view_mode,
    ];

    return static::loadByVariables($entity_type, $variables);
  }

  /**
   * Get the current routes page entity.
   *
   * @return \Drupal\Core\Entity\EntityInterface|null
   *   The entity object.
   */
  public static function getPageEntity() {
    $page_entity = &drupal_static(__FUNCTION__, NULL);
    if (isset($page_entity)) {
      return $page_entity ?: NULL;
    }

    $route_match = \Drupal::routeMatch();
    foreach ($route_match->getParameters() as $param) {
      if ($param instanceof EntityInterface) {
        $page_entity = $param;
        break;
      }
    }

    if (!isset($page_entity)) {
      // Some routes don't properly define entity parameters.
      // Thus, try to load them by its raw Id, if given.
      $entity_type_manager = \Drupal::entityTypeManager();
      $types = $entity_type_manager->getDefinitions();
      foreach ($route_match->getParameters()->keys() as $param_key) {
        if (!isset($types[$param_key])) {
          continue;
        }
        if ($param = $route_match->getParameter($param_key)) {
          if (is_string($param) || is_numeric($param)) {
            try {
              $page_entity = $entity_type_manager->getStorage($param_key)->load($param);
            }
            catch (\Exception $e) {
            }
          }
          break;
        }
      }
    }

    if (!isset($page_entity) || !$page_entity->access('view')) {
      $page_entity = FALSE;
      return NULL;
    }

    return $page_entity;
  }

  /**
   * Get all suggestions for the preprocessor.
   *
   * @param string $hook
   *   The preprocess hook name. Example: 'node' for hook_preprocess_node.
   * @param array $variables
   *   The preprocess variables to alter.
   *
   * @return array
   *   An array of preprocessor ids ordered with the most specific id first.
   *   If $hook != $entity_type, then $entity_type is prefixed with $hook.
   *   The following are from most specific to least specific when
   *   For $hook === $entity_type: $prefix = $entity_type.
   *   For $hook !== $entity_type: $prefix = {$hook}__{$entity_type}.
   *   {$prefix}__group_context__{$group_bundle}__{$entity_bundle}__{$view_mode},
   *   {$prefix}__{$entity_bundle}__{$view_mode},
   *   {$prefix}__group_context__{$group_bundle}__{$entity_bundle},
   *   {$prefix}__{$entity_bundle},
   *   {$prefix}__group_context__{$group_bundle}__{$view_mode}
   *   {$prefix}__{$view_mode},
   *   {$prefix}__group_context__{$group_bundle}
   *   {$prefix};
   */
  public static function getSuggestions($hook, array &$variables = []) {
    // theme_get_suggestions().
    // View mode.
    $view_mode = !empty($variables['view_mode']) ? $variables['view_mode'] : NULL;

    // Build suggestions based on the hook variable.
    if (!empty($variables[$hook])) {
      // Entity preprocessing.
      $entity = NULL;
      $entity_type = NULL;
      $entity_bundle = NULL;
      $entity_group_bundle = NULL;
      $entity_view_mode = NULL;

      if ($hook === 'page') {
        // Page: Find the page entity.
        $route_entity = static::getPageEntity();
        if ($route_entity) {
          $entity_type = $route_entity->getEntityTypeId();
          $entity_bundle = $route_entity->bundle();
          // View mode set to the 'full' for all entity types.
          $entity_view_mode = 'full';
        }
      }
      elseif (is_object($variables[$hook]) && $variables[$hook] instanceof EntityInterface) {
        $entity = $variables[$hook];
        $entity_view_mode = $view_mode;
        $entity_type = $entity->getEntityTypeId();
        $entity_bundle = $entity->bundle();
      }

      // Build suggestions.
      $suggestions = [$hook];

      // View mode.
      if ($view_mode) {
        $suggestions[] = $hook . '__' . $view_mode;
      }

      // Base for all entity rooted suggestions.
      $entity_type_base = $hook;

      // Entity suggestions.
      if (isset($entity_type)) {
        $entity_suggestions = [];
        if ($entity_type != $hook) {
          $entity_type_base = "{$hook}__{$entity_type}";

          // Hook - Entity Type.
          $entity_suggestions[] = $entity_type_base;
        }

        // Hook - Entity Type - Entity View mode.
        if ($entity_view_mode) {
          $entity_suggestions[] = $entity_type_base . '__' . $entity_view_mode;
        }

        // Hook - Entity Type - Bundle.
        if ($entity_bundle) {
          $entity_suggestions[] = $entity_type_base . '__' . $entity_bundle;

          // Hook - Entity Type  - Bundle - Entity View mode.
          if ($entity_view_mode) {
            $entity_suggestions[] = $entity_type_base . '__' . $entity_bundle . '__' . $entity_view_mode;
          }
        }

        // Append all entity suggestions.
        $suggestions = array_merge($suggestions, $entity_suggestions);
      }
    }

    // If there are suggestions return them as expected.
    if (isset($suggestions)) {
      // Ensure suggestions are unique.
      $suggestions = array_unique($suggestions);

      // Reverse so that most specific is first.
      $suggestions = array_values(array_reverse($suggestions));

      return $suggestions;
    }

    // We have no suggestions, so return an empty array in place.
    return [];
  }

}
