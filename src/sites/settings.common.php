<?php
/**
 * Common site settings.
 *
 * The process of running 'grunt install' will automatically set up a Drupal
 * sites/default/settings.php which includes this file.
 */

// Forcibly disable poorman's cron.
$conf['cron_safe_threshold'] = 0;

// Location of config for import/export.
$config_directories = array(
  CONFIG_SYNC_DIRECTORY => '/var/www/src/config/default'
);

$databases['default']['default'] = array (
  'database' => 'drupal_octane',
  'username' => 'admin',
  'password' => 'admin',
  'prefix' => '',
  'host' => 'db',
  'port' => '',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
);

// Load environment specific settings.
// Using docker environment by default, but can change this depending upon
// available hosting environment variables.
if ($drupal_env = getenv('DOCKER_ENV')) {
  if ($drupal_env === 'local') {
    // Local development.
    include __DIR__ . '/settings.common-local.php';
  }
  else {
    // Default to Client environments.
    require __DIR__ . '/settings.common-client.php';
  }
}
else {
  // Client environments.
  require __DIR__ . '/settings.common-client.php';
}
