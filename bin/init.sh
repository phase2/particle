#!/usr/bin/env bash

# Database connection for drush site-install.
DB_URL='mysql://admin:admin@db/drupal_octane'

CONFIRM=''
while [[ $# -gt 0 ]]; do
  case $1 in
    -y)
    CONFIRM='-y'
    shift # past argument
    ;;
    *)    # profile name
    PROFILE="$1"
    shift # past argument
    ;;
  esac
done

if [ -z "$PROFILE" ]; then
  # Default install profile is Acquia Lightning.
  PROFILE="lightning"
fi

# Install project requirements.
composer clear-cache
COMPOSER_PROCESS_TIMEOUT=2000 COMPOSER_DISCARD_CHANGES=1 composer install

# Install Drupal site
if [ -e "src/config/default/system.site.yml" ]; then
  # If config exists, install using it.
  echo "Installing Drupal from existing config..."
  drush si --db-url=$DB_URL --existing-config $CONFIRM
else
  # Otherwise install clean from profile.
  echo "Installing Drupal profile: ${PROFILE}..."
  drush si --db-url=$DB_URL ${PROFILE} $CONFIRM
fi

# Manually set username and password for the admin user.
# @see https://github.com/acquia/blt/issues/2984.
drush sql:query "UPDATE users_field_data SET name = 'admin' WHERE uid = 1;"
drush user:password admin "admin"
