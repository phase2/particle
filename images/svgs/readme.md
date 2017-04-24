Place SVG files in here, then use them in your Twig templates like this: `{{ source('@svgs/filename.svg') }}`. The [`source` function](http://twig.sensiolabs.org/doc/1.x/functions/source.html) returns the content of a template without rendering it - perfect for include a `<svg>` element in your HTML. Make sure to minify it first! A good tool is [`svgo`](https://github.com/svg/svgo).

