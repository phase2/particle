# Particle Drupal

This directory contains Webpack config for Drupal apps within Particle. In
addition it contains a Drupal theme integration and optional helpers module.
This readme assumes Particle is installed inside your Drupal theme. Check
[the Particle docs](https://phase2.gitbook.io/frontend/) for complete details.

If you'd like to separate your Particle tooling from Drupal's theme, see
[Decoupled Drupal Installation](#decoupling) below.

## Drupal Integration

This folder contains two additional directories: `particle_helper` and
`particle_theme`. Due to the process by which Drupal loads services, several
optional Particle-specific functions are expected to exist within a module
separate from the theme. This module can then specify various requirements and
dependencies, which Drupal 8 themes still cannot declare.

**Important**! The Drupal `particle_helper` module is optional template for
additional integration work you may wish to do. However its Twig extension is
required if you are making use of the `attributify` twig filter. This is needed
to manage the separate requirements of Pattern Lab and Drupal's Twig
environments for common HTML attributes.

### Standard Drupal Installation:

1. Move the contents of the `particle_helper` folder to your Drupal
   `modules/contrib` directory (optional).
1. Ensure the module is enabled: `drush en particle_helper` (optional).
1. Ensure the theme is enabled: `drush theme:enable particle`.
1. Ensure the theme is set:
   `drush config-set system.theme default THEME_MACHINE_NAME`.

### Decoupled Drupal Installation

1. Move the contents of the `particle_helper` folder to your Drupal
   `modules/contrib` directory.
1. Move the contents of the `particle_theme` folder to your Drupal
   `theme/contrib` directory.
1. From the main root of the Particle application, open
   `particle.root.config.js`
1. Find the line that starts with `DRUPAL_DIST`
1. Update the `DRUPAL_DIST` line so that the path resolves to the theme created
   in step 2. For example, if the Drupal installation is in a folder named
   `web`, your line might look like this:
   `DRUPAL_DIST: path.resolve('../../web/themes/custom/particle/dist/'),`
1. Ensure the module is enabled: `drush en particle_helper` (optional).
1. Ensure the theme is enabled: `drush theme:enable particle`.
1. Ensure the theme is set:
   `drush config-set system.theme default THEME_MACHINE_NAME`.
