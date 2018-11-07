<?php
/**
 * Local development site settings.
 */

// Active config-split.
// $config['config_split.config_split.local']['status'] = TRUE;

// Enable error reporting and XDEBUG trace.
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
$config['system.logging']['error_level'] = 'all';
ini_set('xdebug.collect_params', '2');
if (PHP_SAPI !== 'cli') {
  ini_set('html_errors', 1);
}

// Development settings.
// For cached testing, override in your settings.local.php.
$config['system.logging']['error_level'] = 'verbose';
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;
$config['system.performance']['cache.page.max_age'] = 0;

// Dev services.
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/development.services.yml';

// Disable render cache.
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';

// Devel settings.
$config['devel.settings']['devel_dumper'] = 'kint';
$config['devel.settings']['error_handlers'][1] = 4;

/**
 * Load local development override configuration, if available.
 *
 * Use settings.local.php to override variables on secondary (staging,
 * development, etc) installations of this site. Typically used to disable
 * caching, JavaScript/CSS compression, re-routing of outgoing emails, and
 * other things that should not happen on development and testing sites.
 *
 * NOTE: Do not add settings.local.php to your git repo as it is only for
 * local changes specific to individual developers.
 *
 * Keep this code block at the end of this file to take full effect.
 */
if (file_exists(__DIR__ . '/settings.local.php')) {
  include __DIR__ . '/settings.local.php';
}

