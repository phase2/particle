# Particle Helper

## Extensions

### Components

The Components namespace is responsible for returning arrays matching particle
components. They're subdivided by atomic concepts:

- Atoms
- Molecules

Functions in each file should return data in the shape a Particle component
expects. For example:

```php
  /**
   * Makes a header in Particle format.
   *
   * @param string $title
   *   The header title.
   *
   * @return array
   *   The header data as an array matching particle component.
   */
  public function makeHeader($title) {
    return [
      'title' => !empty($title) ? $title : '',
    ];
  }
```

This is helpful when you are using a component multiple times over several php
modules and preprocess files.

#### Usage

Each component maker file is registered as a service and can be called inside
any php file using Drupal's class resolver:

```php
/** @var \Drupal\particle_helper\Components\Molecules */
$molecules = \Drupal::service('particle_helper.molecules');

$header = $molecules->makeHeader('My Cool Header');
```

### Twig Extension

All custom Twig Extensions specific to Particle can be added here.

### Particle Tools

Similar to _Components_, ParticleTools provide helper functions for theme
development. However, rather than return particle arrays these functions are
helpers for interacting with Drupal. For example, you may want to get the theme
path from a defined theme constant:

```php
  /**
   * Return the theme path relative to the Drupal root.
   *
   * @return string
   *   The theme path.
   */
  public function getThemePath() {
    return drupal_get_path('theme', Particle::THEME_NAME);
  }
```

#### Usage

To use the Tools library in any php file again use Drupal's class resolver:

```php
/** @var \Drupal\particle_helper\ParticleTools\ParticleTools */
$tools = \Drupal::service('particle_helper.particle_tools');

$theme_path = $tools->getThemePath();
```
