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
 */
class PreprocessorManager {

  /**
   * Cached preprocessor class map.
   *
   * @var array
   */
  protected static $preprocessorClassMap;

  /**
   * Appended suggestions.
   *
   * @var array
   */
  protected static $allSuggestions = [];

  /**
   * Cached instances.
   *
   * @var array
   */
  protected static $preprocessorInstances = [];

  /**
   * Particle tools instance for all preprocessors.
   *
   * @var Drupal\particle\Tools\ParticleTools
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
   * Returns the full path to the directory of the preprocess classes.
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
    $preprocessors = [];
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

    return $preprocessors;
  }

  /**
   * Get the preprocessor class map.
   *
   * @return array
   *   An array with keys of preprocess name and values of full class path.
   */
  public static function getPreprocessorsClassMap() {
    if (!isset(static::$preprocessorClassMap)) {
      static::$preprocessorClassMap = [];

      // Initialize Preprocessors Map with Base.
      $map = [
        'default' => __NAMESPACE__ . '\\Preprocessors\\Base'
      ];

      $suggestions = static::$allSuggestions;
      $mapped_suggestions = [];
      foreach ($suggestions as $suggestion) {
        $mapped_suggestions[$suggestion] =  str_replace('_', '', $suggestion);
      }

      if ($preprocessors = static::getPreprocessors()) {
        foreach ($preprocessors as $preprocessor => $type) {
          if (!is_dir($preprocessor)) {
            $key = array_search(strtolower($preprocessor), $mapped_suggestions);
            if ($key) {
              $map[$key] = __NAMESPACE__ . '\\Preprocessors' . '\\' . $type . '\\' . $preprocessor;
            }
          }
        }
      }

      if ($map && is_array($map)) {
        static::$preprocessorClassMap = $map;
      }
    }
    return static::$preprocessorClassMap;
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

    $map = static::getPreprocessorsClassMap();
    if (isset($map[$id]) && class_exists($map[$id])) {
      $instance = NULL;
      try {
        $instance = new $map[$id](static::getTools());
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

    return null;
  }

  /**
   * Create an instance of the preprocessor class.
   *
   * @param string $hook
   *   The preprocess hook name. Example: 'node' for hook_preprocess_node.
   * @param array $variables
   *   The preprocess variables to alter.
   *
   * @return \Drupal\particle\Plugin\Preprocessor\PreprocessorInterface|null
   *   A cached instance of the preprocessor.
   */
  public static function loadByVariables($hook, array &$variables = []) {
    $suggestions = static::getSuggestions($hook, $variables);
    $map = static::getPreprocessorsClassMap();

    $possible_suggestions = array_values(array_intersect($suggestions, array_keys($map)));
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

    return null;
  }

  /**
   * Loads a preprocessor for the given variables.
   *
   * This is not used in base implementation and exists as example.
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
    return null;
  }

  /**
   * Loads a preprocessor by entity.
   *
   * This is not used in base implementation and exists as example.
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
      // @TODO Better handle empty return.
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

        // Hook - Entity Type  - Bundle.
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

    // Return suggestions.
    if ($suggestions) {
      // Ensure suggestions are unique.
      $suggestions = array_unique($suggestions);

      // Reverse so that most specific is first.
      $suggestions = array_values(array_reverse($suggestions));

      // If we haven't seen the suggestion before, add it for id mapping.
      static::$allSuggestions = array_unique(array_merge($suggestions, static::$allSuggestions));

      return $suggestions;
    }

    return [];
  }

}
