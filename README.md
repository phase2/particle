# Pattern Lab Starter

[![Travis CI Badge](https://api.travis-ci.org/phase2/pattern-lab-starter.png)](https://travis-ci.org/phase2/pattern-lab-starter) 

## Super Quick Setup

Use our [Yeoman Generator](https://github.com/phase2/generator-pattern-lab-starter) for the best way to spin this up for your project. Directly cloning and working on this repo is for contributors. 

### Prerequesites 

You'll need [node.js](http://nodejs.org) and ruby.

```bash
npm install --global grunt-cli bower yo
gem install bundler
npm install --global generator-pattern-lab-starter
```

### Spinning it up

First, we need to pick a folder; do one of these:

1. If you have a CMS, like Drupal, you want to integrate this into, `cd` into the theme folder (can be existing or blank). So you'll be in something like `site/all/themes/my_theme_name/`.
2. If you just want to get the front end going first, make an empty folder and `cd` into it.

```bash
yo pattern-lab-starter
```

## Install and setup
    
After cloning and changing into that directory, run this to install dependencies:

    npm install
    bower install
    bundle install

You may have to run that again for updates; so it may be wise to save this: `npm install && bower install && bundler install`. **If you have any problems; this is the first thing to run.**

Once everyting is installed, start patternlab simply by invoking grunt:

    grunt

If you want to use this for another project and want to add it to a different git repo; simply run:

    rm -rf .git/

# Features

## ECMAScript 6 support

Use JavaScript from the future today! Any ES6 written in "js/es6/" will be compiled to "js/compiled-from-es6.js" via [Babel](https://babeljs.io) (using `grunt-babel`). If you need to compile just this, run `grunt babel`.

## Visual Regression Testing

**New Feature in Testing**

- To run all visual regression tests, execute `grunt regressionQA`
- To configure, edit `grunt-tasks/regression-qa/regression-qa.js`
- To create new tests, duplicate the approach seen with files that end in `*.test.js` in `pattern-lab/source/_patterns/`
    - Weird bug: all `*.test.js` files must contain an empty last line in the file or you get a "SyntaxError: Parse error"
- If you made an intentional change and are getting a failed test (because something did intentionally visually change), you need to run this from next to the `*.test.js` file:

```bash
# Assuming our test is called `atoms-buttons`
# Delete our screen shot of the former known good
rm baselines/atoms-buttons.png
# Move the screen shot of the new current state into the baseline folder and rename it
mv results/atoms-buttons.diff.png baselines/atoms-buttons.png
```

### `grunt testClean` task

You can all clear all baselines out and start over by basically saying that: how the site looks now is what I want future tests to compare against by running this:

```bash
grunt testClean:all
```

Additionally, individual components can be targeted by running this:

```bash
grunt testClean:name-of-test
```

### `grunt test` task 

Can accept two params:

- `tests`: If this param is blank then a server is spun up and all tests are run. If a value is passed (i.e. `featured-item`) then `featured-item-test.js` is run by itself. Much quicker than waiting for all tests.
- `new`: If `new` is passed in to the second param, then the associated baselines for the selected test file is deleted before running

```bash
grunt test
grunt test:*
grunt test:featured-item:new
```

# Assets (CSS & JS)

To add either CSS or JS to Pattern Lab, use one of these methods:

## Bower

Installing any [Bower](http://bower.io) component with the `--save` or `--save-dev` flag will get the `main` asset's `<link>` or `<script>` tags added to Pattern Lab automatically via [wiredep](https://github.com/taptapship/wiredep). So, you can search for [anything that Bower can install](http://bower.io/search/) and run:

    bower install {thing} --save

## Adding direct paths

Adding paths to `pattern-lab-assets.yml` will get the CSS or JS added to Pattern Lab.

## Editing the head or foot partial

If you want the most direct access, which the two above methods inject into, then just head to one of these files:

- `pattern-lab/source/_patterns/00-atoms/00-meta/_00-head.mustache`
- `pattern-lab/source/_patterns/00-atoms/00-meta/_01-foot.mustache`

## Configuration

The main configuration file for the whole project is `Gruntconfig.yml`; you'll find several important settings there, such as:

- directories and paths for scss, pattern lab, and javascript
- local server settings

`Gruntconfig.yml` is commited with the project and shared between members of the team; however individuals can create a file called `Gruntconfig--custom.yml` and override specific values there – that file is ignored by git so it can be customized per person (for example, some people like to set `openBrowserAtStart` to false).

There are many different pieces of tech and many files that set the preferences for each of them. Here's a list of them and where to find the config file for each.

- Compass/Sass: `config.rb` - [docs](http://compass-style.org/help/documentation/configuration-reference/)
- Bundler (Ruby Gem Versions): `Gemfile` - [docs](http://bundler.io)
- Pattern Lab: `pattern-lab/config/config.ini` - [docs](http://patternlab.io/docs/advanced-config-options.html)
- Grunt: `Gruntfile.js` and `package.json` - [docs](http://gruntjs.com/configuring-tasks)
- Bower (library management): `bower.json` and `.bowerrc` - [docs](http://bower.io/)

## Conventions

- Relative links instead of root relative links for paths (where possible) i.e. use `../images/logo.png` instead of `/images/logo.png`
- All directory variables have trailing slash like this: `../path/to/dir/` - this allows us to set it to `./` and have it all be relative to Gruntfile
- Use camelCase for naming
- Use code comments todos on the same line or above issue like this: // @todo Example Todo Message
- Grunt plugins config object should have a comment to the docs URL

## Pattern Lab Terms

- **Atoms** are basic tags, such as form labels, inputs or buttons. They also include more abstract elements like color palettes, fonts, and animations.
- **Molecules** are groups of elements that function together as a unit. For example, a form label, search input, and button atom can combine them together to form a search form molecule.
- **Organisms** can consist of similar and/or disparate molecule types. For example, a masthead organism might consist of a logo, navigation, and search form, while a “product grid” organism might consist of the same product info molecule repeated over and over.
- **Templates** are comprised mostly of organisms combined together to form page-level objects. Templates mostly focus on content structure (such as character length, image size, etc) rather than the actual content.
- **Pages** are specific instances of templates and swap out placeholder content with real representative content.

[More info](http://patternlab.io/about.html)

### Advanced Pattern Lab Concepts

- [Including Patterns in Patterns](http://patternlab.io/docs/pattern-including.html)
- [Introduction to JSON & Mustache Variables](http://patternlab.io/docs/data-json-mustache.html)
    - [Creating Pattern-specific Values](http://patternlab.io/docs/data-pattern-specific.html)
    - [Creating Lists with `listItems` Variable](http://patternlab.io/docs/data-listitems.html)
- [Linking to Patterns](http://patternlab.io/docs/data-link-variable.html)
- [Adding Annotations](http://patternlab.io/docs/pattern-adding-annotations.html)
- [Pattern Lab's Special Query String Variables](http://patternlab.io/docs/pattern-linking.html)
- [Using styleModifiers](http://patternlab.io/docs/pattern-stylemodifier.html)
- [Using Pattern States](http://patternlab.io/docs/pattern-states.html)
- [Using Pattern Parameters](http://patternlab.io/docs/pattern-parameters.html)
- [Keyboard Shortcuts](http://patternlab.io/docs/advanced-keyboard-shortcuts.html)
- [Editing the config.ini Options](http://patternlab.io/docs/advanced-config-options.html)

## More Info

### About Pattern Lab

- [Pattern Lab Website](http://patternlab.io/)
- [About Pattern Lab](http://patternlab.io/about.html)
- [Documentation](http://patternlab.io/docs/index.html)
- [Demo](http://demo.patternlab.io/)

### About Grunt

- [Grunt Website](http://gruntjs.com)
- Article by Chris Coyier: [Grunt for People Who Think Things Like Grunt are Weird and Hard ◆ 24 ways](http://24ways.org/2013/grunt-is-not-weird-and-hard/)

## Font icons

- After running `grunt`, see [http://localhost:9005/pattern-lab/public/?p=atoms-icons](http://localhost:9005/pattern-lab/public/?p=atoms-icons) in your browser for instructions on font icons

