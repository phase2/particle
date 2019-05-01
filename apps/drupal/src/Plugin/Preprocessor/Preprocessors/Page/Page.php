<?php

namespace Drupal\particle\Plugin\Preprocessor\Preprocessors\Page;

use Drupal\particle\Plugin\Preprocessor\Preprocessors\Base;

/**
 * Provides a base page preprocessor.
 */
class Page extends Base {

  /**
   * {@inheritdoc}
   */
  public function process(array &$variables) {
    parent::process($variables);
    // Update Page Variables Here.
    return $this;
  }

}
