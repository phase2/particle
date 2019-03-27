<?php

namespace Drupal\particle\Plugin\Preprocessor\Preprocessors;

use Drupal\particle\Plugin\Preprocessor\PreprocessorInterface;
use Drupal\particle\Tools\ParticleTools;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Provides a base preprocessor.
 */
class Base implements PreprocessorInterface {

  use StringTranslationTrait;

  /**
   * The tools object.
   *
   * @var \Drupal\particle\Tools\ParticleTools
   */
  protected $tools;

  /**
   * Constructor.
   *
   * @param \Drupal\particle\Tools\ParticleTools $tools
   *   The tools object.
   */
  public function __construct(ParticleTools $tools) {
    $this->tools = $tools;
  }

  /**
   * Get the tools object.
   *
   * @return \Drupal\particle\Tools\ParticleTools|null
   *   The tools object.
   */
  public function getTools() {
    return $this->tools;
  }

  /**
   * {@inheritdoc}
   */
  public function process(array &$variables) {
    $this->ensure($variables);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function ensure(array &$variables) {
    if (empty($variables['_init_processed'])) {
      $variables['_init_processed'] = TRUE;
      $this->init($variables);
    }
  }

  /**
   * Initialize non-pattern variables useful to any extending class.
   *
   * More info:
   * This is called only once per process() call.
   *
   * Classes should override to provide extra setup variables.
   *
   * This is used to decouple some base variables need by any extending class.
   * This can be called without having to call parent::process() which is not
   * ideal in all cases.
   */
  public function init(array &$variables) {
    // Ensure pattern settings.
    if (empty($variables['#pattern_settings'])) {
      $variables['#pattern_settings'] = [];
    }
  }

  /**
   * Ensure that the pattern settings exist.
   */
  protected function ensurePatternSettings(array &$variables) {
    if (!isset($variables['#pattern_settings'])) {
      // Create global pattern settings.
    }
  }

  /**
   * Get pattern settings by reference.
   */
  public function &getPatternSettings(array &$variables) {
    $this->ensurePatternSettings($variables);
    return $variables['#pattern_settings'];
  }

  /**
   * Set the pattern settings.
   */
  public function setPatternSettings(array &$variables, array $settings) {
    $variables['#pattern_settings'] = $settings;
    return $this;
  }

  /**
   * Merge the pattern settings.
   */
  public function &mergePatternSettings(array &$variables, array $settings) {
    $stored_settings = $this->getPatternSettings($variables);
    $variables['#pattern_settings'] = $settings + $stored_settings;
    return $variables['#pattern_settings'];
  }

}

