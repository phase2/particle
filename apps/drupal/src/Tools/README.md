# Particle Tools

ParticleTools adds a suite of Theme Helper functions common to Drupal. 
These can be used across Particle Drupal Application.

## Configuration

`Particle.php` includes a set of global constants configuration specific to 
a installation of Particle: 

* `THEME_NAME`: The Drupal theme name, default is set as Particle.
* `ASSETS_PATH`: The path to the compiled assets for Drupal to consume.
* `FRONTEND_DOCS`: A direct link to Phase2's Front End Particle docs. 

Be aware that this configuration should be updated based on your Particle. 
If you change these variables of your theme, these `const` should be updated.  

## Usage

If you have an additional helper function you'd like to include in your app, 
simply extend the functionality of `ParticleTools.php`:

```php
class MyCustomThemeTools extends ParticleTools
``` 

This step will make sure any changes to your theme are not lost if you update
Particle in the future.

Particle Tools have already been added to individual `theme.inc` files, however
if you'd like to use the Tools elsewhere in PHP simply include the namespace to
the file (or your custom Tools):

```php
use Drupal\particle\Tools\ParticleTools;
```

Now whenever you wish to use a helper:

```php
ParticleTools::yourHelperFunction()
```

Note this usage assumes you've declared a public static function and that it's
return is not tied specifically to the context of the instance. If you need a
more context specific approach, consider using public functions and declaring
your tools as an instance:

```php
$tools = new ParticleTools
$tools->yourHelperFunction()
```
