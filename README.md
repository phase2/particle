[![Build Status](https://travis-ci.org/phase2/pattern-lab-starter.svg?branch=master)](https://travis-ci.org/phase2/pattern-lab-starter)

# Prerequisites

- [Node](https://nodejs.org) v6 + (v4 might work, no promises)
- PHP 5.4, 5.5, 5.6, OR 7 (5.3 might work, no promises)
- [`composer`](https://getcomposer.org)

# QuickStart

[Download this repo](https://github.com/phase2/pattern-lab-starter/archive/master.zip), rename folder to `patternlab` and place in themes directory if integrating with Drupal 8, and then `cd` into folder before running below commands. To name it something else, see [docs/setup.md](docs/setup.md).

```bash
npm install # or `yarn install` if you want 3x the speed
npm run setup
npm start
```

If you're using Drupal 8, get the [Component Libraries module](https://www.drupal.org/project/components):

```bash
drush dl components
drush en components -y
```

That's it.

## Commands

Compile everything:

```bash
npm run compile
```

Start up watches and local server after compiling:

```bash
npm run start # or `npm start`
```

> Protip: any config option from `gulpconfig.yml` can be overwritten with `npm start -- --js.enabled=''`, or by including options in your own `~/.p2-theme-corerc` file. See [`rc`](https://www.npmjs.com/package/rc) for more details.

Run Tests:

```bash
npm run test # or `npm test`
```

Create a new component folder in Pattern Lab with scss, twig, md, & yml/json by running:

```bash
npm run new
```

To update node and composer dependencies (if you see messages about Pattern Lab wanting to Merge or Replace files, merge them):

```bash
npm run update
```

## Assets

Get front end libraries downloaded with Bower like so:

    bower install {project-name} --save

Afterwards, you'll need to add them to Drupal and Pattern Lab:

1. Pattern Lab: Go to `source/_meta/` and in `_00-head.twig` or `01-foot.twig`, add the `<link>` or `<script>` tags needed.
2. Drupal: Add them to the appropriate library in the `*.libraries.yml` file and attach them where needed.

Using `--save` shows it's intention to be used in Pattern Lab and Drupal; using `--save-dev` shows it's just for Pattern Lab.

### Icons and SVGs

Two systems exists for flexibility: SVGs as HTML elements, and SVGs compiled into Font Icons.

#### SVG Elements

Useful for larger, less frequently used vector images that potentially could be multi-color or able to animate.

1. Place `file.svg` in `images/svgs/` and possible minify yourself.
2. Use it in Twig templates like so: `{{ source('@svgs/file.svg') }}` ([info on `source`](http://twig.sensiolabs.org/doc/1.x/functions/source.html))

#### SVG => Font Icons

Useful for small, frequently used icons that are a single color which is changeable via CSS.

1. Place `file.svg` in `images/icons/src/`
2. See it automatically appear in Pattern Lab at "Atoms > Images > Icons".
3. Use either way:
    - HTML class: `icon--file`
    - Sass Mixin: `@include icon(file)`

### Sass Libraries

Sass libraries are installed using bower as well; you can see how we import them in the main scss file. These are the ones available:

- [Normalize](https://github.com/JohnAlbin/normalize-scss) - Better style reset
- [Singularity Grid System](https://github.com/at-import/Singularity) - Grid system
- [Breakpoint](http://breakpoint-sass.com) - A cleaner way to do breakpoints/media queries
- [Bourbon](http://bourbon.io/docs) - Helpful mixins

## Orientation

- source/
  - _annotations/ ([annotations](http://patternlab.io/docs/pattern-adding-annotations.html) for Patterns)
  - _data/ (Global JSON data files available to all Patterns, can add multiple)
  - _patterns/ (Twig, Scss, and JS all in here)
    - 00-base/ (Twig Namespace: `@base`)
      - Contains what all that follows needs: variables, mixins, and grid layouts for examples
    - 01-atoms/ (Twig Namespace: `@atoms`)
    - 02-molecules (Twig Namespace: `@molecules`)
    - 03-organisms (Twig Namespace: `@organisms`)
    - 04-templates (Twig Namespace: `@templates`)
    - 05-pages (Twig Namespace: `@pages`)
  - _meta/ (contains the header and footer Twig templates for PL; add any `<link>` or `<script>` tags here; don't edit in between the `<!-- inject -->` tags though; it'll get overwritten)
- pattern-lab/
  - config/config.yml (Pattern Lab configuration)
  - public/ (Where Pattern Lab compiles too, it's just static HTML)
  - composer.json (run `composer update` next to this to update dependencies)
- scss/ - Sass files that aren't really tied to a component, so not in the above location.
- js/ - all js files here and transpiled by Babel and combined into a single `dest/script.js` file.
- images/icons/src/ - all SVGs here are combined into font icons and have classes and Sass mixins made for each based on file name. See `atoms/images/icons` in Pattern Lab.
- dest/ - Many compiled assets end up in here like CSS, JS, Font Icons, and any doc systems like [SassDoc](http://sassdoc.com).
- templates/ - Drupal twig templates. These often will `include`, `embed`, or `extend` the Twig templates found in Pattern Lab like this: `{% include "@molecules/branding/branding.twig" with { url: path('<front>') } %}`. We keep the components in Pattern Lab "pure" and ignorant of Drupal's data model and use these templates to map the data between the two. Think of these as the Presenter templates in the [Model View Presenter](https://en.wikipedia.org/wiki/Model–view–presenter) approach. Also, Drupal Twig templates that have nothing to do with Pattern Lab go here.
- gulpconfig.yml - Configuration for all the gulp tasks, a ton can be controlled here.

### IDE/Text Editor Setup

- Install an EditorConfig plugin
- Ignore the indexing of these directories:
  - `node_modules/`
  - `bower_components/`
  - `dest/`
  - `pattern-lab/public/`
  - `pattern-lab/vendor/`

---

# Details

## Pattern Lab

Refer to the [Pattern Lab Documentation](http://patternlab.io/docs) for extensive info on how to use it. This theme starter is a custom Pattern Lab 2 *Edition* that is heavily influenced by the [Drupal Edition of Pattern Lab](https://github.com/pattern-lab/edition-php-drupal-standard) and uses the Twig engine to bring it inline with Drupal 8's use of Twig.

### Folder Structure Differences

Our folder structure makes a slight but convenient alteration to the typical Pattern Lab folder setup. Basically we move `pattern-lab/source/` up one level because we keep Sass in there too and it's the "source" for much of the theme. Here's the difference between the typical and our structure (few folders mentioned for brevity; please see Orientation above for a more thorough list).

#### Typical Folder Structure

- pattern-lab/
  - config/
  - public/
  - source/
    - _patterns/ (contains atoms, molecules, etc folders)
  - composer.json

#### Our Folder Structure

- source/
  - _patterns/ (contains atoms, molecules, etc folders)
- pattern-lab/
  - config/
  - public/
  - composer.json

### Dummy data using `Faker`

[`Faker`](https://github.com/fzaninotto/Faker) generates fake data and the [Faker plugin for Pattern Lab](https://github.com/pattern-lab/plugin-php-faker) is used here. This generates *different* fake content for each compile, and allows [translated content](https://github.com/pattern-lab/plugin-php-faker#locales) as well.

**Faker only works in the global data files** found in `source/_data/` currently until [this bug](https://github.com/pattern-lab/plugin-php-faker/issues/2) is fixed.

Use it like this in `source/_data/data.json`:

```json
{
  "description": "Faker.paragraph",
  "text": "Faker.words(3, true)",
  "byline": "Faker.sentence",
  "intro": "Faker.sentences(2, true)"
}
```

The formatters (things like `.paragraph`, `.words`, etc) can accept options, when you see `Faker.words(3, true)` that means give me 3 random words and I'd like them as a string and not an array of strings. All the [formatters and their options are documented here](https://github.com/fzaninotto/Faker#formatters) - there's tons: numbers, address, names, dates, and more.

## Configuration

It's almost all done in `gulpconfig.yml`. End all paths with a `/` please (i.e. `path/to/dir/`). The local `gulpfile.js` passes the `config` object to [`p2-theme-core`](https://github.com/phase2/p2-theme-core) - which can be viewed at `node_modules/p2-theme-core/` (most stuff in `lib/`).

Many of the features can be turned off, for example if we didn't want all the JS features like linting and concatenation, just toggle `enabled` under `js` in `gulpconfig.yml`. So you'd just open `gulpconfig.yml` and change this:

```diff
js:
-    enabled: true
+    enabled: false
```

Documentation for many of the features are found in `node_modules/p2-theme-core/docs/` – those are [hosted here](http://p2-theme-core.readthedocs.org) too.

### Linting Config

- JS: edit `.eslintrc` - [rule docs](http://eslint.org/docs/rules/)
- Scss: edit `.stylelintrc.js` - [docs](http://stylelint.io/user-guide/)

#### Disabling Stylelint rules for a certain section

You can [use comments to turn off certain rules](http://stylelint.io/user-guide/configuration/#turning-rules-off-from-within-your-css) easily:

```scss
// stylelint-disable selector-no-id, declaration-no-important
#id {
  color: pink !important;
}
// stylelint-enable

.class {
  color: pink !important; // stylelint-disable-line declaration-no-important
}
```

### Babel JS Transpiling Config

Edit `.babelrc` for configuration of [Babel rules](https://babeljs.io/docs/usage/options/) that transpile JS. Default allows ES6 to be transpiled to ES5. Learn about awesome [ES6 features](http://es6-features.org) here.

## Gulp

Gulp 4 is used and the `npm run` commands above basically trigger gulp without having to install a global dependency. If you want to run specific gulp tasks, run `npm run gulp -- OPTIONS TASKS`. The `--` passes whatever comes after to the `gulp` command. Run `npm run gulp -- --tasks` to see the whole list, here's some examples of what you can do:

- `npm run gulp -- --help` - See the help menu
- `npm run gulp -- css` - Compile CSS
- `npm run gulp -- pl` - Compile PL

Add anything to `gulpfile.js` that you want! Also, you can copy any file from `node_modules/p2-theme-core/lib/` into your repo and use it as a starting point (may need to install packages from `p2-theme-core` too.)

Many of the features can be turned off, for example if we didn't want all the JS features like linting and concatenation, just toggle `enabled` under `js` in `gulpconfig.yml`. So you'd just open `gulpconfig.yml` and change this:

```diff
js:
-    enabled: true
+    enabled: false
```

Also, if you're still getting the annoying (but not harmful) warnings about `graceful-fs`, run `npm update -g npm`.

### Helpful Gulp 4 resources

- [Gulp 4 Docs](https://github.com/gulpjs/gulp/tree/4.0/docs)
- [Gulp 4 Readme](https://github.com/gulpjs/gulp/blob/4.0/README.md)

## Drupal 8 Integration

From your Drupal Twig templates in `templates/` you can `{% include %}`, `{% extends %}`, and `{% embed %}` your Pattern Lab Twig template files. Each of the top level folders has a Twig Namespace like `@organisms` and then you append the path down to the file like below.

```twig
{% include "@organisms/path/to/file.twig" with {
  title: label,
  largeCTA: true
} %}
```

For a demonstration in a sample codebase of how exactly to integrate templates, see the [`drupal-lab`](https://github.com/phase2/drupal-lab) repo; in particular note how both a [node teaser template](https://github.com/phase2/drupal-lab/blob/master/web/themes/dashing/templates/content/node--article--teaser.html.twig) and a [views field template](https://github.com/phase2/drupal-lab/blob/master/web/themes/dashing/templates/views/views-view-fields--newspage--page.html.twig) in the Drupal `templates/` folder can embed the [card template](https://github.com/phase2/drupal-lab/blob/master/web/themes/dashing/pattern-lab/source/_patterns/02-molecules/cards/card.twig) from Pattern Lab while formatting the data.
