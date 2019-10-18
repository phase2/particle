# How to handle static assets!

Please note that image implementations may contain this or similar code:

```twig
{% include "@atoms/_image.twig" with {
  image: {
    src: paths.images ~ '/logo.svg',
  }
} %}
```

The logo is file is stored in `project/themes/particle/source/images`,
where it is imported into our design system as a proton in:
`project/themes/particle/source/default/_patterns/00-protons/index.js`

Notice how this `index.js` contains this code:

```javascript
import '../../../images/logo.svg';
```

All static assets (images, fonts) **must** be referenced within the javascript
dependency chain to be moved to `dist/assets/`. 
These assets will be available to PL after running `npm run compile:pl`.
The example here provides *Pattern Lab* assets only, as protons assets are not
exported. The individual implementation should include references to files as
needed.
