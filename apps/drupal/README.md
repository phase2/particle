# Drupal Theming with Particle

**Note:** This readme assumes Particle is installed at the root of your Drupal
project and not within Drupal's theme structure as in previous versions of
Particle. Check [the Particle docs](https://phase2.gitbook.io/frontend/) for
assistance if your configuration does not match.

## Setup

This folder contains two additional directories: `module` and `theme`. Due to
the process by which Drupal loads services, several Particle-specific functions
are expected to exist within a module separate from the theme. This module can
then specify various requirements and dependencies, which Drupal 8 themes still
cannot declare.

To prepare your Drupal installation to use Particle:

1. Move the contents of the `module` folder to your Drupal `modules/contrib` directory.
1. Move the contents of the `theme` folder to your Drupal `theme/contrib` directory.
1. From the main root of the Particle application, open `particle.root.config.js`
1. Find the line that starts with `DRUPAL_DIST`
1. Update the `DRUPAL_DIST` line so that the path resolves to the theme created in step 2.
  For example, if the Drupal installation is in a folder named `web`, your line might look like this:
  `DRUPAL_DIST: path.resolve('../../web/themes/custom/particle/dist/'),`
1. Ensure the module is enabled: `drush en particle_theme`.
1. Ensure the theme is enabled: `drush theme:enable particle`.
1. Ensure the theme is set: `drush config-set system.theme default THEME_MACHINE_NAME`.
