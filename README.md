# Pattern Lab Starter

## Brief Overview

### One line install and setup

    git clone git@bitbucket.org:phase2tech/pattern-lab-starter.git && cd pattern-lab-starter && bash scripts/setup-everything.sh
  
Already downloaded the repo? Just run this to make you've got dependencies and helpers taken care of:
  
    bash scripts/setup-everything.sh


## Quick Start Guide

- To start, run `grunt` - this kicks off Dev Mode: Sass/Compass watch, Pattern Lab Watch, and auto-reload for your browser.
  - Point your browser towards `public/index.html` to see the site
- To build the site once, run `grunt build`
  - Or for the non-grunters: run `bash scripts/build-on-mac.sh`
- Edit Patterns:
    - Open files in `source/_patterns`
      - Atoms, Molecules, Organisms, Templates, and Pages are all found here
- Edit Data/Content:
    - Globally: edit `source/_data/_data.json`
    - List Items: edit `source/_data/_listitems.json`
    - For a component: edit the file that has the same name, but ends in `.json`

### Conventions to Follow

- [BEM](http://bem.info) for picking class names
- [Atomic Design](http://bradfrostweb.com/blog/post/atomic-web-design/) for how we think about breaking componets out of pages
- [Git Flow](http://nvie.com/posts/a-successful-git-branching-model/) for how we branch and merge. Nice overview [here](https://www.atlassian.com/git/workflows#!workflow-gitflow)
    - Work in the branch `dev` or branch off of `dev` to create a feature branch, which gets merged back into `dev` after. Working on `dev` is OK. `dev` gets merged in `master` when it's time. Hotfixes branch off of `master`, get merged back into `master` and then  `dev` and then are deleted.
    - Naming conventions:
        - Feature branch: `feature--name-of-feature` (always branch off of `dev`)
        - Hotfix branch: `hotfix--name-of-fix` (always branch off of `master`)
    - **Delete your feature branches or hotfix branches after they are merged back in**. Let's keep this branch list slim.
- Relative links instead of root relative links for paths (where possible)
    - Use `../images/logo.png` instead of `/images/logo.png`

### Pattern Lab Terms

- **Atoms** are basic tags, such as form labels, inputs or buttons. They also include more abstract elements like color palettes, fonts, and animations.
- **Molecules** are groups of elements that function together as a unit. For example, a form label, search input, and button atom can combine them together to form a search form molecule.
- **Organisms** can consist of similar and/or disparate molecule types. For example, a masthead organism might consist of a logo, navigation, and search form, while a “product grid” organism might consist of the same product info molecule repeated over and over.
- **Templates** are comprised mostly of organisms combined together to form page-level objects. Templates mostly focus on content structure (such as character length, image size, etc) rather than the actual content.
- **Pages** are specific instances of templates and swap out placeholder content with real representative content.

[More info](http://patternlab.io/about.html)

    
## Details

### Configuration

There are many different pieces of tech and many files that set the preferences for each of them. Here's a list of them and where to find the config file for each.

- Compass/Sass: `source/scss/config.rb` - [docs](http://compass-style.org/help/tutorials/configuration-reference/)
- Bundler (Ruby Gem Versions): `source/scss/Gemfile` - [docs](http://bundler.io)
- Pattern Lab: `config/config.ini` - [docs](http://patternlab.io/docs/advanced-config-options.html)
- Grunt: `Gruntfile.js` and `package.json` - [docs](http://gruntjs.com/configuring-tasks)
- Bower (library management): `bower.json` and `.bowerrc` - [docs](http://bower.io/)

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
