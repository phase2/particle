# Setup

    npm install

## Commands

Compile the site:

    npm run compile

Start up watches and local server:

    npm run start

Run Tests:

    npm run test

## Assets

Get front end libraries injected into Drupal theme info file and Pattern Lab with:

    bower install {project-name} --save

Using `--save` adds to Pattern Lab and Drupal; using `--save-dev` adds to just Pattern Lab.

## Configuration

It's almost all done in `config.yml`. End all paths with a `/` please (i.e. `path/to/dir/`). The local `gulpfile.js` passes the `config` object to [`p2-theme-core`](https://github.com/phase2/p2-theme-core) - which can be viewed at `node_modules/p2-theme-core/` (most stuff in `lib/`).

Documentation for many of the features are found in `node_modules/p2-theme-core/docs/` – those are [hosted here](http://p2-theme-core.readthedocs.org) too.

### Linting Config

- JS: edit `.eslintrc` - [rule docs](http://eslint.org/docs/rules/)
- Scss: edit `.sass-lint.yml` - [rule docs](https://github.com/sasstools/sass-lint/tree/master/docs/rules)

### Babel JS Transpiling Config

Edit `.babelrc` for configuration of [Babel rules](https://babeljs.io/docs/usage/options/) that transpile JS. Default allows ES6 to be transpiled to ES5. Learn about awesome [ES6 features](http://es6-features.org) here.

## More control

The `npm run` commands above basically trigger gulp without having to install a global dependency. For fine grained control of tasks, install gulp globally with `npm install --global gulp` and then run `gulp help` for a list of all available tasks.

Add anything to `gulpfile.js` that you want! Also, you can copy any file from `node_modules/p2-theme-core/lib/` into your repo and use it as a starting point (may need to install packages from `p2-theme-core` too.)

Many of the features can be turned off, for example if we didn't want all the JS features like linting and concatenation, just toggle `enabled` under `js` in `config.yml`. So you'd just open `config.yml` and change this:

```diff
js:
-    enabled: true
+    enabled: false
```

### Contributing to `p2-theme-core`

If you have an improvement, please contribute! Clone the `p2-theme-core` repo and then run this command while in this directory:

    npm link ../path/to/p2-theme-core

That will symlink `node_modules/p2-theme-core/` to the cloned `p2-theme-core` repo. 
