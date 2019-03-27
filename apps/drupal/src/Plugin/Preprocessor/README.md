# Particle Preprocessor

The Particle Preprocessor Plugin creates a system to preprocess theme templates.
The system allows for processing via PHP rather than within Twig templates or
overly long `.theme` files.

## Preprocessors

The Preprocessor directory contains the PHP work to preprocess templates.
To match the Plugin system in Drupal core, these files should be named in the following manner:

Entity - Bundle - View Mode 

The Preprocessor directory is automatically scanned and loaded as a Class Map in ParticlePreprocessorManager.php.

For now, each entity, bundle and view name should be separated by a capital letter.
For example, if you have a `node--article--card-max`, name your php file: `NodeArticleCardmax.php`

The directory scanner creates a suggestions => preprocessors matching array:

```
entity__bundle__view => EntityBundleView
```

There are three Preprocessors provided to the theme by default:

* `Base.php`
* `Page.php`
* `Node.php`

The `Base.php` preprocessor is the root implementation all preprocessors inherit from.
It represents the base implementation of a preprocessor.

`Page.php` and `Node.php` preprocess their respective hooks via the PreprocessManager method:

See `particle_preoprocess_page` hook to see how this is added:

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

With the above in place as the hook, `loadByVariables` will direct hook type
preprocessing to the correct folder and type. In `Preprocessors/Page.php` you
can now update your variables in the `process` method.
