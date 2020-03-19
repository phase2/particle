# Particle Theme

## Particle Plugins

Particle adds three sets of Theme Plugin helpers to simplify repetitive tasks.
The goal of these is to split some basic theme configuration with the
overrides we'd expect to use in Drupal. The directory structure is here:

```
|-- includes
    |-- admin.theme.inc
    |-- blocks.theme.inc
    |-- content.theme.inc
    |-- field.theme.inc
    |-- form.theme.inc
    |-- layout.theme.inc
    |-- media.theme.inc
    |-- misc.theme.inc
    |-- navigation.theme.inc
    |-- node.theme.inc
    |-- suggestions.theme.inc
    |-- user.theme.inc
    |-- views.theme.inc
|-- src
    |-- CustomTools
        |-- CustomTools.php
    |-- ParticleTools
        |-- ParticleTools.php
    |-- Widgets
        |-- Widgets.php
```

To guarantee this theme is as update-able as possible, all `./includes`, 
`src/CustomTools`, `src/Widgets` directory code are considered to be 
project-specific code. What this means is that you have a safe assumption of 
putting overrides here that have no effect on ongoing development of the Particle
project as a whole. Simply put, you're safe to "hack Particle core" here.


### Configuration

`Particle.php` includes a set of global constants configuration specific to 
a installation of Particle: 

* `THEME_NAME`: The Drupal theme name, default is set as Particle.

Be aware that this configuration should be updated based on your Particle. 
If you change these variables of your theme, these `const` should be updated.  

### Usage

If you have an additional helper function you'd like to include in your app, 
simply extend the functionality of `ParticleTools.php` in `CustomTools.php`:

```php
class CustomTools extends ParticleTools {};
``` 

This step will make sure any changes to your theme are not lost if you update
Particle in the future.

CustomTools have already been added to individual `theme.inc` files, however
if you'd like to use the Tools elsewhere in PHP simply include the namespace to
the file (or your custom Tools):

```php
use Drupal\particle\CustomTools\CustomTools;
```

Now whenever you wish to use a helper:

```php
CustomTools::yourHelperFunction();
```

Note this usage assumes you've declared a public static function and that it's
return is not tied specifically to the context of the instance. If you need a
more context specific approach, consider using public functions and declaring
your tools as an instance:

```php
$tools = new CustomTools;
$tools->yourHelperFunction();
```
