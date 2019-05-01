<?php

namespace Drupal\particle\Plugin\Preprocessor\Preprocessors\Node;

use Drupal\particle\Plugin\Preprocessor\Preprocessors\Base;

/**
 * Provides a base node preprocessor.
 */
class Node extends Base {

  /**
   * {@inheritdoc}
   */
  public function process(array &$variables) {
    parent::process($variables);

    return $this;
  }

}
