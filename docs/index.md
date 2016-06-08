## QuickStart

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
