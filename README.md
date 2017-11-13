# NAMETBD: A design system integrating to Pattern Lab and a Drupal 8 theme

[![Build Status](https://travis-ci.org/phase2/pattern-lab-starter.svg?branch=master)](https://travis-ci.org/phase2/pattern-lab-starter)

NAMETBD is a highly-opinionated set of tools and examples to:

1. Build an application-agnostic **design system**
1. Apply that design system to a locally-served **Pattern Lab** for rapid prototyping
1. Apply that design system to a **Drupal theme**

In depth documentation about frontend approach using this project at [Phase2 Frontend Docs](https://phase2.github.io/frontend-docs/)

## Prerequisites

- [Node `^8.0.0`](https://nodejs.org)
- [PHP `^7.0.0`](https://php.net)
- [Composer](https://getcomposer.org)

## Provides

- Drupal theme and Pattern Lab app
- Strict [Atomic Design](http://atomicdesign.bradfrost.com/) component structure
- Webpack bundling of all CSS, javascript, font, and static image assets for multiple targets (Drupal theme and Pattern Lab)
- Webpack Dev Server for local hosting and auto asset injection into Pattern Lab and Drupal
- Auto namespace addition into Drupal theme and Pattern Lab. Within any twig file, `@atoms/thing.twig` means the same thing to Drupal theme and Pattern Lab.
- Iconfont auto-generation
- Bootstrap 4 integration, used for all starting example components
- Auto-linting against the [AirBnB JavaScript Style Guide](https://github.com/airbnb/javascript) and sane Sass standards
- All Webpack and Gulp files are fully configurable

## Quickstart

NAMETBD can be run from anywhere to work with Pattern Lab. It also provides a theme to a Drupal website.

### Quickstart anywhere

1. [Download the latest release](https://github.com/phase2/pattern-lab-starter/releases)
1. Extract anywhere (i.e. this readme should be at `any/where/NAMETBD/README.md`)
1. Within the extracted folder run:

```bash
npm install
npm run setup
npm start
```

Simply wait until the webpack bundle output appears then visit [http://0.0.0.0/pl](http://0.0.0.0/pl) (or [http://localhost/pl](http://localhost/pl)) and start working.

### Quickstart with Drupal 8

NAMETBD provides a Drupal 8 theme, the starting steps are slightly different:

1. [Download the latest release](https://github.com/phase2/pattern-lab-starter/releases)
1. Extract to `themes/` at the root of your Drupal 8 install. (i.e. this readme should be at `drupal-root/themes/NAMETBD/README.md`)
1. Download and install the [Component Libraries module](https://www.drupal.org/project/components):

```bash
drush dl components
drush en components -y
```

1. Within `drupal-root/themes/NAMETBD/` run:

```bash
npm install
npm run setup
npm run compile:drupal
```

This will compile all assets and provide all namespaces to the Drupal theme. Make sure to choose this theme in Drupal Appearance settings and `drush cr` to clear cache.

For subsequent recompile and Drupal cache clear, run:

```bash
npm run compile:drupal && drush cr
```

Working rapidly in Pattern Lab is still available, simply run:

```bash
npm start
```

Just like in the regular Quickstart, when Webpack output appears, visit [http://0.0.0.0/pl](http://0.0.0.0/pl) (or [http://localhost/pl](http://localhost/pl)) to immediately start building and previewing your design system in Pattern Lab.

That's it. For **much** greater detail on the frontend approach using this project, check out the [Phase2 Frontend Docs](https://phase2.github.io/frontend-docs/).

## Commands

Quick compile Pattern Lab:

```bash
npm run compile:pl
```

Quick compile Drupal

```bash
npm run compile:drupal
```

Start up watches and local server:

```bash
npm start
```

Run all linters:

```bash
npm run lint
```

Run all tests:

```bash
npm test
```

Run accessibility testing on Pattern Lab rendered output:

```bash
npm run test:accessibility
```

To update node and composer dependencies (**merge** if offered the option):

```bash
npm run update
```

## Structure

The following are significant items at the root level:

    # ./
    .
    ├── apps                           # Things that use the compiled design system. Drupal theme & PL
    ├── dist                           # Bundled output: CSS, js, images, app artifacts (like PL html)
    ├── source                         # The design system. All assets compiled to dist/
    ├── tools                          # Gulp plugins and node tools
    ├── gulpfile.js                    # Defines the few tasks required in the workflow
    ├── webpack.drupal.config.js       # Entry point for the Drupal theme bundle
    ├── webpack.pl.config.js           # Entry point for the Pattern Lab bundle
    ├── webpack.shared.config.js       # Shared bundle configuration for all entry points
    └── ...                            # Mostly just config

`source/` holds all assets for the design system and looks like this:

    # ./source/
    .
    ├── _patterns                      # All assets live within an Atomic "pattern"
    │   ├── 01-atoms                   # Twig namespace: @atoms, JS/Sass namespace: atoms
    │   │   ├── button                 # For instance, the button atom
    │   │   │    ├── demo              # Patterns feature a demo folder to show implementation
    │   │   │    │   ├── buttons.twig  # Demonstrate with a plural name, visible to PL since no underscore
    │   │   │    │   └── buttons.yml   # Data provided to the demo pattern
    │   │   │    ├── _button.scss      # Most components require styles, underscore required
    │   │   │    ├── _button.twig      # The pure component template, underscore required
    │   │   │    └── index.js          # Component entry point (See "Anatomy of a Component below)
    │   │   └── ...                    # Other @atoms
    │   └── ...                        # @base, @atoms, @molecules, @organisms, @templates, @pages
    └── design-system.js               # The ultimate importer/exporter of the design system pieces

>The design system is *consumed by* "apps". The two apps included are a Drupal theme and a Pattern Lab installation.

`app/pl/` holds the *entry point* for all Pattern Lab assets, as well as the PHP engine:

    # ./app/pl/
    .
    ├── pattern-lab/                   # Holds the Pattern Lab installation
    │   ├── ...                        # composer.json, config, console php, ...
    ├── scss                           # PL-only Sass; styles that shoudln't junk up the design system
    │   ├── _scss2json.scss            # Output certain Sass variables into json for demo in PL
    │   └── _styleguide.scss           # Custom PL UI styles
    └── index.js                       # Imports and applies the design system to a bundle for PL

`app/drupal/` holds the *entry point* for all Drupal 8 theme assets, as well as templates, yml, etc:

    # ./app/drupal/
    .
    ├── scss/                          # Theme-only Sass, tweaks to Drupalisms that need not be in the DS
    │   └── _drupal-styles.scss        # Add more drupal styles here, like _views.scss, _field.scss etc
    ├── templates                      # Templates integrate Drupal data with design system patterns
    │   ├── block.html.twig            # Example Drupal template integrating, say @molecules/_card.twig
    │   └── ...                        # There wil be many Drupal templates
    ├── index.js                       # Imports and applies the design system to a bundle for Drupal
    ├── NAMETBD.info.yml               # Theme information. DS namespaces are auto-injected!
    ├── NAMETBD.libraries.yml          # The output js and css bundles are included here
    ├── NAMETBD.theme                  # Drupal preprocess functions
    └── index.js                       # Imports and applies the design system to a bundle for Drupal

## Anatomy of a Component

All components require a set of files:

    # ./source/_patterns/01-atoms/button/
    .
    ├── demo                           # Demo implementations, can be removed on deploy to prod
    │   ├── buttons.md                 # Markdown with extra notes, visible in PL UI
    │   ├── buttons.twig               # Demonstrate with a plural name, visible to PL since no underscore
    │   └── buttons.yml                # Data provided to the demo pattern
    ├── _button.scss                   # Most components require styles, underscore required
    ├── _button.twig                   # The pure component template, "_" required to hide from PL UI
    └── index.js                       # Component entry point

With the power of [Webpack](https://webpack.js.org/), all static assets a component needs are `import`ed right into the `index.js` **entry point** alongside the javascript methods:

```javascript
// source/_patterns/01-atoms/button/index.js

// Import *EVERY* NPM dependency.
import $ from 'jquery';
// Import specific plugins this component may need
import 'bootstrap/js/src/button';

// source/_patterns/01-atoms/00-base/index.js
import 'base';

// Import local Sass (which in turn imports Bootstrap Sass)
import './_button.scss';

// Req. 1 of a component: name
export const name = 'button';

// Req. 2 of a component: disable function
export function disable() {}

// Req. 3 of a component: enable function. `$context` is `$(document)` in PL, and `context` in Drupal
export function enable($context) {

  // `.button()` is only available because of `import 'bootstrap/js/src/button';` above
  $('#blah', $context).button('toggle');
}

// Req. 4 of a component: default export is the enable function
export default enable;
```

See the Sass and Twig sections below for more

## Sass

NAMETBD makes a very clear distinction between *printing* and *non-printing* Sass in components.

> Printing Sass generates actual, rendered CSS output.

This results in rendered CSS:

```scss
.thing {
  background: blue;
}
```

> Non-printing Sass results in no CSS

This won't output any CSS:

```scss
$rando-var: 33px;
@mixin doThing() {
  background: blue;
}
```

There is a very clear role for each in the component system of NAMETBD. In the `button` component featured above in [Anatomy of a Component](#anatomy-of-a-component), note this import:

```javascript
// source/_patterns/01-atoms/button/_index.js
...
import './_button.scss';
...

```

Looking into `source/_patterns/01-atoms/button/_button.scss` reveals:

```scss
@import '../../00-base/config'; // DOES NOT OUTPUT CSS!

$btn-border-radius: 0.25rem;
@import "~bootstrap/scss/buttons"; // OUTPUTS CSS!

.custom-class {
  color: red;    // OUTPUTS CSS!
}
```

This approach to component styes allows sharing non-printing Sass **configuration**, while also ensuring our component prints its custom CSS exactly once. We can now safely `@import 'atoms/button;` anywhere in our other javascript components as many times as needed and there will be no duplicate CSS output for buttons!

## Twig

Twig notes here

## Atomic Design and Namespaces

"Namespaces" are simply aliases to paths on a file system. The design system within `source/` adheres strongly to [Atomic Design](http://atomicdesign.bradfrost.com/), with `@base` added on.

| Path                             | Twig         | Javascript  | Sass |
| -------------------------------- | ------------ | ----------- | ---- |
| `source/_patterns/00-base/`      | `@base`      | `base`      | TBD
| `source/_patterns/01-atoms/`     | `@atoms`     | `atoms`     | TBD
| `source/_patterns/02-molecules/` | `@molecules` | `molcules`  | TBD
| `source/_patterns/03-organisms/` | `@organisms` | `organisms` | TBD
| `source/_patterns/04-templates/` | `@templates` | `templates` | TBD
| `source/_patterns/05-pages/`     | `@pages`     | `pages`     | TBD

Our reasoning for categorization of components within each is pretty close to pure Atomic Design principals, but here's a quick explanation.

- **Base** features Sass systems and non-consumable pattern markup. No Twig file will `@include` anything from @base, but javascript and Sass will. This is a uniquely NAMETBD convention.
- **Atoms** upward **will** be included in other Twig files.

    > "Atoms of our interfaces serve as the foundational building blocks that comprise all our user interfaces. These atoms include basic HTML elements like form labels, inputs, buttons, and others that can’t be broken down any further without ceasing to be functional. [Source.](http://atomicdesign.bradfrost.com/chapter-2/#atoms)
- **Molecules** are more complex widgets that must at least include an atom and sometimes other molecules.

  > "In interfaces, molecules are relatively simple groups of UI elements functioning together as a unit. For example, a form label, search input, and button can join together to create a search form molecule." [Source.](http://atomicdesign.bradfrost.com/chapter-2/#molecules)
- **Organisms** feature atoms, molecules, and even other organisms (sparingly). Think headers, footers, blog rolls.

  > "Organisms are relatively complex UI components composed of groups of molecules and/or atoms and/or other organisms." [Source.](http://atomicdesign.bradfrost.com/chapter-2/#organisms)
- **Templates** are page layouts, giving us a view into how content can possibly be laid out.

  > "Templates are page-level objects that place components into a layout and articulate the design’s underlying content structure." [Source.](http://atomicdesign.bradfrost.com/chapter-2/#templates)
- **Pages** can be considered full "prototypes" of a design systgem, with real content, images, etc.

  > "Pages are specific instances of templates that show what a UI looks like with real representative content in place." [Source.](http://atomicdesign.bradfrost.com/chapter-2/#pages)

## Assets

Assets are "static" files that make up all clientside applications. Examples of static assets are:

- CSS
- Javascript bundles
- .map files for debugging CSS and Javascript
- Font files
- JPEG, PNG, GIF, and SVG images
- favicons

> Assets are compiled to the dist/ folder if they are @import'd in some file within the dependency chain of your app. Only files within dist/ are available to be served to your apps.

### "Dependency Chain"

NAMETBD takes a modern approach to asset management through Webpack. Instead of files spread around a project that have to be referenced individually on the client side, apps now have entry point javascript files that @import dependencies that @import dependencies that @import dependencies and so on.

Using Webpack to **[bundle](https://webpack.js.org/guides/getting-started/#creating-a-bundle)** this dependency chain up into as few output files as possible to the `dist/` directory means we have a `source/` (and `apps/`) folder that is structured the way we want to work, with a consistent output.

Consider this dependency chain for the `apps/pl` app:

                                                         <- @base
                                                         <- jquery
                                                         <- bootstrap/src/js/buttons
                                    <- @atoms/button     <- _button.scss
                                                         <- @base
                                                         <- jquery
                                                         <- bootstrap/src/js/cards
    apps/pl <- source/design-system <- @molecules/card   <- _card.scss
                                                         <- @base
                                                         <- bootstrap/src/js/jumbotron
                                    <- @organisms/header <- _header.scss

### Font Icons

Useful for small, frequently used icons that are a single color which is changeable via CSS.

1. Place `filename.svg` in `source/_patterns/01-atoms/icon/svg/`
1. Start up active server with `npm start` or compile via `npm run compile:pl|drupal`
1. View new font icon demo page in Pattern Lab at [Atoms > Icon > Icons](http://localhost:8080/pl/?p=atoms-icons)
1. Use either way:
    - HTML class: `icon--filename`
    - Sass Mixin: `@include icon(filename)`

> IMPORTANT: Font icons are only compiled at the start of a webpack build. The webpack dev server will have to be restarted to see new icons appear in the font.

#### Inline SVG

Useful for larger, less frequently used vector images that potentially could be multi-color or able to animate.

1. Place `file.svg` within a namespaced folder, like `source/_patterns/01-atoms/icon/svg/`.
1. Use the special `_svg.twig` pattern to inline it completely. For instance, using the path in step 1, include it like so:
    ```twig
    {% include '@atoms/image/_svg.twig' with {
      svgpath: '@atoms/icon/svg/file.svg',
    } %}
    ```
1. OR just use the [`source`](https://twig.symfony.com/doc/2.x/functions/source.html) function provided by Twig: `{{ source('@atoms/icon/svg/file.svg') }}`

### Static images

Static image notes here.

## Configuration

### Webpack

### Gulp

### Linting

- Javascript: edit `.eslintrc.js` - [docs](http://eslint.org/docs/rules/)
- Sass: edit `.stylelintrc` - [docs](http://stylelint.io/user-guide/)

### IDE/Text Editor Setup

Install an [EditorConfig](http://editorconfig.org/) plugin for NAMETBD coding conventions.

- [VSCode](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [JetBrains (*Storm)](https://plugins.jetbrains.com/plugin/7294-editorconfig)
- [Atom](https://github.com/sindresorhus/atom-editorconfig)
- [Sublime Text](https://github.com/sindresorhus/editorconfig-sublime)


## Apps

### Drupal

### Pattern Lab

## Orientation (REVAMP)

- templates/ - Drupal twig templates. These often will `include`, `embed`, or `extend` the Twig templates found in Pattern Lab like this: `{% include "@molecules/branding/branding.twig" with { url: path('<front>') } %}`. We keep the components in Pattern Lab "pure" and ignorant of Drupal's data model and use these templates to map the data between the two. Think of these as the Presenter templates in the [Model View Presenter](https://en.wikipedia.org/wiki/Model–view–presenter) approach. Also, Drupal Twig templates that have nothing to do with Pattern Lab go here.

# Details (REVAMP THIS)

## Pattern Lab

Refer to the [Pattern Lab Documentation](http://patternlab.io/docs) for extensive info on how to use it. This theme starter is a custom Pattern Lab 2 *Edition* that is heavily influenced by the [Drupal Edition of Pattern Lab](https://github.com/pattern-lab/edition-php-drupal-standard) and uses the Twig engine to bring it inline with Drupal 8's use of Twig.


### Dummy data using `Faker` (REVAMP)

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

### Linting Config

- JS: edit `.eslintrc` - [rule docs](http://eslint.org/docs/rules/)
- Scss: edit `.stylelintrc` - [docs](http://stylelint.io/user-guide/)

#### Disabling Stylelint rules for a certain section (REVAMP)

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

### Babel JS Transpiling Config (REVAMP)

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

### Helpful Gulp 4 resources (REVAMP)

- [Gulp 4 Docs](https://github.com/gulpjs/gulp/tree/4.0/docs)
- [Gulp 4 Readme](https://github.com/gulpjs/gulp/blob/4.0/README.md)

## Drupal 8 Integration (REVAMP)

From your Drupal Twig templates in `templates/` you can `{% include %}`, `{% extends %}`, and `{% embed %}` your Pattern Lab Twig template files. Each of the top level folders has a Twig Namespace like `@organisms` and then you append the path down to the file like below.

```twig
{% include "@organisms/path/to/file.twig" with {
  title: label,
  largeCTA: true
} %}
```

For a demonstration in a sample codebase of how exactly to integrate templates, see the [`drupal-lab`](https://github.com/phase2/drupal-lab) repo; in particular note how both a [node teaser template](https://github.com/phase2/drupal-lab/blob/master/web/themes/dashing/templates/content/node--article--teaser.html.twig) and a [views field template](https://github.com/phase2/drupal-lab/blob/master/web/themes/dashing/templates/views/views-view-fields--newspage--page.html.twig) in the Drupal `templates/` folder can embed the [card template](https://github.com/phase2/drupal-lab/blob/master/web/themes/dashing/pattern-lab/source/_patterns/02-molecules/cards/card.twig) from Pattern Lab while formatting the data.
