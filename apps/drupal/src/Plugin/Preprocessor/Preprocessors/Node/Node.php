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
  public function init(array &$variables) {
    parent::init($variables);
    parent::process($variables);
  }

}
