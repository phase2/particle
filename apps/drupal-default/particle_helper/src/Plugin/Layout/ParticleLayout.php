<?php

namespace Drupal\particle_helper\Plugin\Layout;

/**
 * @file
 * Contains \Drupal\particle_helper\Plugin\Layout\ParticleLayout.
 */

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Layout\LayoutDefault;
use Drupal\Core\Plugin\PluginFormInterface;
use Drupal\particle\Particle;

/**
 * Provides a layout options for Layout Builder.
 */
class ParticleLayout extends LayoutDefault implements PluginFormInterface {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration() {
    return parent::defaultConfiguration() + [
      'spacer_bottom' => '',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildConfigurationForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildConfigurationForm($form, $form_state);
    $configuration = $this->getConfiguration();

    $spacings = Particle::SPACING;
    $spacer_bottom_options = [];
    foreach ($spacings as $key => $value) {
      $spacer_bottom_options['mb-' . $key] = $value;
    }
    $spacer_bottom_options = array_merge(['_none' => $this->t('-None-')], $spacer_bottom_options);

    $form['spacer_bottom'] = [
      '#type' => 'select',
      '#options' => $spacer_bottom_options,
      '#title' => $this->t('Additional Bottom Spacing'),
      '#description' => $this->t('Select a value for additional bottom spacing. These are based on design spacers.'),
      '#default_value' => $configuration['spacer_bottom'],
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitConfigurationForm(array &$form, FormStateInterface $form_state) {
    parent::submitConfigurationForm($form, $form_state);
    $this->configuration['spacer_bottom'] = ($form_state->getValue('spacer_bottom') != '_none') ? $form_state->getValue('spacer_bottom') : '';
  }

}
