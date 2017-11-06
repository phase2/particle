# How to handle static assets!

Please note how `@atoms/image/demo/logo.twig` contains this code:

```
{% include "@atoms/_image.twig" with {
  img: {
    src: paths.assets ~ '/logo.svg',
  }
} %}
```

And also notice how `@atoms/image/index.js` contains this code:

```
import './logo.svg';
```

All static assets (images, fonts) **must** be referenced within the javascript dependency chain to be moved to `dist/assets/`. These assets will be available to PL after running `npm run compile:pl`.
