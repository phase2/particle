# Pattern Lab Starter Theme

> For QuickStart instructions, installation and requirements, visit the [README.md](../README.md) at the root of the _Pattern Lab Starter_ directory.

A starting place for using the prototyping tool, [Pattern Lab](http://patternlab.io), in tandem with a Drupal theme. Can be used standalone as well.

## Theme Setup

> Once you've ran `npm install` and have your theme environment installed, you'll want to rename the theme to something appropriate for your project. 

### Renaming the `patternlab` theme

> We'll rename several files, and references to paths to setup our custom theme. 
> For this purpose, my new theme will have a system name of `my_custom_theme`. 
> Simply replace any instance of that with your own theme name.

* **Rename** top level directory from `patternlab` to `my_custom_theme`.
* **Rename** `patternlab.theme` to `my_custom_theme.theme`.
* **Rename** `patternlab.libraries.yml` to `my_custom_theme.libraries.yml`.
* **Rename** `patternlab.info.yml` to `my_custom_theme.info.yml`.
* **Open** the newly renamed `my_custom_theme.info.yml` and edit the following:
  * **Edit** **Name** to reflect an appropriate friendly name for the theme, like: `My Custom Theme`.
  * **Edit** **Description** to reflect an appropriate description for the theme, like: `My very custom theme for a very fun project...`.
  * **Change** `patternlab/core` under `libraries` to `my_custom_theme/core`.
* **Open** `gulpconfig.js` and edit the following:
  * **Change** **drupal.enabled** from `false` to `true` **if** Drupal is installed.
  * **Change** **drupal.themeFile** from `patternlab.info.yml` to `my_custom_theme.info.yml`.
  * **Optionally check** the **drupal.command** to ensure the Drush cache rebuild command is appropriate for your environment setup. 
* **Save & Close** any edited files.
* **Enable** your new theme at `/admin/appearance` by clicking `Install and set as default` for **My Custom Theme**.
* **Run** `npm start` in the root of your `my_custom_theme` directory.
* ...
* **Profit**.

## Using `my_custom_theme`

> Now that we have our renamed theme installed and ready to sync between Drupal and PatternLab, we'll look at modifying an existing _Molecule_, then adding a new _Molecule_ to PatternLab, and using them in Drupal.

### Twig Concepts & Resources
> For the majority of the items demonstrated here, the following Twig documentation will prove useful. 
* [**Twig Documentation**](http://twig.sensiolabs.org/documentation)
  * [Embed](http://twig.sensiolabs.org/doc/tags/embed.html)
  * [Extends](http://twig.sensiolabs.org/doc/tags/extends.html)
  * [Include](http://twig.sensiolabs.org/doc/tags/include.html)
  * [Block](http://twig.sensiolabs.org/doc/tags/block.html)
* [**Drupal Twig Documentation**](https://www.drupal.org/docs/8/theming/twig)
  * [Working with Twig Templates](https://www.drupal.org/docs/8/theming/twig/working-with-twig-templates)
  * [Twig Template naming conventions](https://www.drupal.org/docs/8/theming/twig/twig-template-naming-conventions)
  * [Discovering and Inspecting Variables](https://www.drupal.org/docs/8/theming/twig/discovering-and-inspecting-variables-in-twig-templates)
  * [Debugging Twig Templates](https://www.drupal.org/docs/8/theming/twig/debugging-twig-templates)

### Altering Branding Template

Let's take a look at the core `branding.twig` _Molecule_ that represents our **Logo**, **Site Name** and **Site Slogan**. 
It can be found at `source/_patterns/02-molecules/branding/branding.twig`.
This _Molecule_ has been built in Pattern Lab and is ready to be used by Drupal to help render this specific data.

##### Pattern Lab Template

```twig
<aside class="branding">
  {% if site_logo %}
    <div class="branding__logo">
      <a href="{{ url }}" title="{{ 'Home'|t }}" rel="home">
        <img src="{{ site_logo }}" alt="{{ 'Home'|t }}" />
      </a>
    </div>
  {% endif %}

  {% if site_name %}
    <h2 class="branding__name">
      <a href="{{ url }}" title="{{ 'Home'|t }}" rel="home">{{ site_name }}</a>
    </h2>
  {% endif %}

  {% if site_slogan %}
    <h6 class="branding__slogan">{{ site_slogan }}</h6>
  {% endif %}
</aside>
```

Now if we want to have Drupal use this Twig template to render our branding block, observe the following in `templates/block--system-branding-block.html.twig`:

##### Drupal Template

```twig
{% extends "block.html.twig" %}
{% block content %}
  {% include "@molecules/branding.twig"
    with {
      "url": path('<front>')
    }
  %}
{% endblock %}
```

> Note the **@molecules** in the include statement above. This namespacing is handled by the [Components](https://www.drupal.org/project/components) module.
> The gulp tasks also help by writing the appropriate data to `my_custom_theme.info.yml` in the `component-libraries` portion to represent new namepsaces as we create them in Pattern Lab and translates that back to Drupal to be referenced.

The first thing we see in the Drupal template is that this block template `{% extends block.html.twig %}`. 

> By default, this theme is using `Stable` as its `base theme` in `my_custom_theme.info.yml`. 
> We will look in `core/themes/stable/templates/block` for the default `block.html.twig`.

##### Default `block.html.twig`

```twig
<div{{ attributes }}>
  {{ title_prefix }}
  {% if label %}
    <h2{{ title_attributes }}>{{ label }}</h2>
  {% endif %}
  {{ title_suffix }}
  {% block content %}
    {{ content }}
  {% endblock %}
</div>
```

What we can see above in the default `block.html.twig` markup is that it has a `<div>` wrapper with some attributes applied, an (optional) `<h2>` title including a prefix and suffix, etc.

Next, we see the `{% block content %}` which is what we are replacing in the instance of our `block--system-branding-block.html.twig` above. 

Essentially, the content from our custom branding block template, which is wrapped in the default block template is using a Twig **include** statement to _include_ the content of our Pattern Lab template and using **with** to pass variables to the Pattern Lab template. 

#### Changing the variables passed to Pattern Lab template

If we want to change the `site_slogan`, we could do the following in our `block--system-branding-block.html.twig`:

```twig
{% include "@molecules/branding.twig"
  with {
    "url": path('<front>'),
    "site_slogan": 'Your custom development environment template variable...'|t,
    "site_name": 'Overridden Site Name'|t,
  }
%}
```

#### Using preprocess to handle variables to pass to Pattern Lab template

Now, the above example showed how to just override the variables in our original Pattern Lab template with _something_ provided by a drupal template. 

You can easily go beyond this, and instead of the example of replacing the Twig variable with static text in the template, we could use an alternate variable provided by a preprocess function:

```php
function my_custom_theme_preprocess_block__system_branding_block(&$variables) {
  $variables['custom_variable'] = [
    'url' => 'http://example.com',
    'slogan' => 'My Custom Slogan is a good one..',
    'name' => 'My Website',
  ];
}
```

```twig
{% include "@molecules/branding.twig"
  with {
    "url": custom_variable.url,
    "site_slogan": custom_variable.slogan|t,
    "site_name": custom_variable.name|t,
  }
%}
```

So by doing the above, you can start to see where a flexibility lies allowing you to assign data to a variable that will allow passing Drupal data back to our exact Pattern Lab component markup.

You can be as specific (or generic) as you want in the creation of your appropriate _Atoms_, _Molecules_ and _Organisms_. 
