# Particle Preprocessor

The Particle Preprocessor Plugin creates a system to preprocess theme templates.
The system allows for processing via PHP rather than within Twig templates
or overly long `.theme` files.

## Preprocessors

The Preprocessor directory contains the php work to preprocess templates.
To match the Plugin system in Drupal core, these files should be named in the
following manner:

```
Entity - Bundle - View Mode 
```

The Preprocessor directory is automatically scanned and loaded as a Class Map in
PreprocessorManager.php.

For now, each entity, bundle and view name should be separated by a capital
letter. For example, if you have a `node--article--teaser`, name your php file:
`NodeArticleTeaser.php`.

The directory scanner creates a suggestions => preprocessors map array:

```
entity__bundle__view => EntityBundleView
```

This map is loaded into Drupal's State API via the `preprocessor.map` key.
Note this use considers a single theme using the plugin.
If multi-theme solution is needed, additional work may need to be done to ensure
the mapping is done correctly.

There are three example Preprocessors provided to the theme by default:

* `Base.php`
* `Page.php`
* `Node.php`

The `Base.php` preprocessor is the root implementation all preprocessors inherit
from. It represents the base implementation of a preprocessor.

`Page.php` and `Node.php` preprocess their respective theme hooks via the
PreprocessManager process method. This effectively re-routes a hooks variables
via the map located in the State API to the most specific matching php class in
the map.

To use Page.php in your project, add the following lines to your theme file as a
`particle_preoprocess_page` hook:

```php
/**
 * Implements template_preprocess_page().
 */
function particle_preprocess_page(&$variables) {
  // Process All Variables Via PreprocessClass.
  PreprocessorManager::loadByVariables('page', $variables)
    ->process($variables);
}
```

To use Node.php in your project, add the following lines to your theme file as a
`particle_preoprocess_node` hook:

```php
/**
 * Implements template_preprocess_node().
 */
function particle_preprocess_node(&$variables) {
  // Process All Variables Via PreprocessClass.
  PreprocessorManager::loadByVariables('page', $variables)
    ->process($variables);
}
```

With the above in place as the hook, `loadByVariables` will direct hook type
preprocessing to the correct folder and type. For example, you can now update
your variables via the `process` method in `Preprocessors/Page.php` and
`Preprocessors/Node.php`. Note that `loadByVariables` is only necessary to add
once per type. In the above example, all Node preprocessors are added directly
from `particle_preoprocess_node`.

## Usage

Now that Preprocessors are wired together via the PreprocessorManager and our
hooks, we can use these classes. For example, let's say you have a Twig template
for a node type called Article, for the display mode Teaser. Since you already
have Node "turned on" in `particle_preprocess_node`, all you have to do is
create a new class and extend.

* Create NodeArticleTeaser.php inside 
`particle/apps/drupal/src/Plugin/Preprocessor/Preprocessors/Node/`
* Copy/paste contents of `Node.php` and rename the class to NodeArticleTeaser
  * Bonus! Update the extends statement to 
  `class NodeArticleTeaser extends Node` to inherit work done in `Node.php`.
* Process your variables here like an OOP theme expert!

Let's say we have an alert that may or may not exist and we want it directly to
override our Article Teaser. Consider the following code you might find
in a Preprocessor:

```php
<?php

namespace Drupal\particle\Plugin\Preprocessor\Preprocessors\Node;

/**
 * Provides a Article Teaser node preprocessor.
 */
class NodeArticleTeaser extends Node {

  /**
   * {@inheritdoc}
   */
  public function process(array &$variables) {
    parent::process($variables);

    $some_alert_condition_that_may_be_true = TRUE;

    if ($some_alert_condition_that_may_be_true) {
      $title = t('Important alert information!');
      $body = t('Some really long text we received and want to display.');

      $alert = [
        'type' => 'status',
        'alert_other_classes' => 'mb-4',
        'alert_title' => $title,
        'alert_primary' => $body,
      ];

      $variables['alert'] = $alert;
    }

    return $this;
  }

}
```

While the above is a contrived example, it shows how we easily assembled a
_pattern_ that we recognize from Pattern Lab. Now in the template file for your
Node Article Teaser, node--article--teaser.html.twig.
