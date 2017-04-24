## Adding links to Pattern Lab on Drupal Appearance page

Add this to `THEME-NAME.info.yml`:

```yaml
resources:
  pattern-lab: /themes/custom/THEME_NAME/pattern-lab/public/
  sassdoc: /themes/custom/THEME_NAME/dest/sassdoc/
```

Add this code to a custom module:

```php

<?php
/**
 * @file
 * Module code for Pattern Lab.
 */

use Drupal\Core\Url;

/**
 * Implements hook_system_themes_page_alter().
 */
function MODULE_NAME_system_themes_page_alter($theme_groups) {
  foreach ($theme_groups['installed'] as $theme) {
    if (isset($theme->info['resources']['pattern-lab'])) {
      $theme->operations[] = [
        'title' => t('Pattern Lab'),
        'url' => Url::fromUri('base:' . $theme->info['resources']['pattern-lab']),
        'attributes' => [
          'title' => t('Pattern Lab for @theme theme', ['@theme' => $theme->info['name']]),
          'target' => '_blank',
        ],
      ];
    }
    if (isset($theme->info['resources']['sassdoc'])) {
      $theme->operations[] = [
        'title' => t('SassDoc'),
        'url' => Url::fromUri('base:' . $theme->info['resources']['sassdoc']),
        'attributes' => [
          'title' => t('SassDoc for @theme theme', ['@theme' => $theme->info['name']]),
          'target' => '_blank',
        ],
      ];
    }
  }
}
```

Thanks Adam Ross!
