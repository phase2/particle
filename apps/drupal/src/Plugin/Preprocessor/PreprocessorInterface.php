<?php

namespace Drupal\particle\Plugin\Preprocessor;

/**
 * Provides a common interface for theme preprocessor.
 */
interface PreprocessorInterface {

  /**
   * Ensures $vars has been initialized with base variables.
   *
   * Internally, this should call an init() function only once per process()
   * call.
   *
   * @param array $variables
   *   The theme hook preprocess variables altered by reference.
   *
   * @return $this
   *   The current preprocessor object.
   */
  public function ensure(array &$variables);

  /**
   * Process the theme variables.
   *
   * @param array $variables
   *   The theme hook preprocess variables altered by reference.
   *
   * @return $this
   *   The current preprocessor object.
   */
  public function process(array &$variables);

}
