[![Build Status](https://travis-ci.org/phase2/pattern-lab-starter.svg?branch=master)](https://travis-ci.org/phase2/pattern-lab-starter)

# QuickStart

    npm install
    npm start

If you're using Drupal 8, get the [Component Libraries module](https://www.drupal.org/project/components):

    drush dl components
    drush en components -y

That's it.

## Orientation

- `source/_patterns/` - contains all Pattern Lab templates and the majority of the Sass files.
- `scss/` - Sass files that aren't really tied to a component, so not in the above location.
- `js/` - all js files here and transpiled by Babel and combined into a single `dest/script.js` file.
- `images/icons/src/` - all SVGs here are combined into font icons and have classes and Sass mixins made for each based on file name. See `atoms/images/icons` in Pattern Lab.
- `dest/sassdoc/` - Open this in a browser to see documentation on all Sass thanks to [SassDoc](http://sassdoc.com).

## Commands

Compile everything:

```bash
npm run compile
```

Start up watches and local server after compiling:

```bash
npm run start # or `npm start`
```

Run Tests:

```bash
npm run test # or `npm test`
```

Create a new component folder in Pattern Lab with scss, twig, md, & yml/json by running:

```bash
npm run new
```

---

# Details

## Pattern Lab

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
- Scss: edit `.sass-lint.yml` - [rule docs](https://github.com/sasstools/sass-lint/tree/master/docs/rules)

### Babel JS Transpiling Config

Edit `.babelrc` for configuration of [Babel rules](https://babeljs.io/docs/usage/options/) that transpile JS. Default allows ES6 to be transpiled to ES5. Learn about awesome [ES6 features](http://es6-features.org) here.

## Assets

Get front end libraries injected into Drupal theme info file and Pattern Lab with:

    bower install {project-name} --save

Using `--save` adds to Pattern Lab and Drupal; using `--save-dev` adds to just Pattern Lab. Automatic injection for Drupal currently only works in Drupal 7; manually add it in Drupal 8.

## Gulp

The `npm run` commands above basically trigger gulp without having to install a global dependency. For fine grained control of tasks, install gulp globally with `npm install --global gulp` and then run `gulp help` for a list of all available tasks.

Add anything to `gulpfile.js` that you want! Also, you can copy any file from `node_modules/p2-theme-core/lib/` into your repo and use it as a starting point (may need to install packages from `p2-theme-core` too.)

Many of the features can be turned off, for example if we didn't want all the JS features like linting and concatenation, just toggle `enabled` under `js` in `gulpconfig.yml`. So you'd just open `gulpconfig.yml` and change this:

```diff
js:
-    enabled: true
+    enabled: false
```

## Drupal 8 Integration

From your Drupal Twig templates in `templates/` you can `{% include %}`, `{% extends %}`, and `{% embed %}` your Pattern Lab Twig template files. Each of the top level folders has a Twig Namespace like `@organisms` and then you append the path down to the file like below.

    {% include "@organisms/path/to/file.twig" %}

For a demonstration in a sample codebase of how exactly to integrate templates, see the [`drupal-lab`](https://github.com/phase2/drupal-lab) repo.
