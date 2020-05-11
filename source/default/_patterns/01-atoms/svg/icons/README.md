# SVG Pattern
The SVG is a special pattern in Particle that is designed to allow us to include
SVG as CSS or inline. Furthermore, this pattern is setup to be optimized as a
developer step via `npm run fmt:svg` or `npm run fmt`.

## Adding SVG
To add an SVG to the system, simply add it to `@atoms/svg/svg/` directory and
run the format command. This step is **destructive**, so be aware of using
source control to revert unintended changes.

### XMLS

Each colorable svg which declares a variable needs the following on the svg tag:
`xmlns:var="https://github.com/cascornelissen/svg-spritemap-webpack-plugin/"`

This allows you to place color variables on path, for example:

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg width="7px" height="11px" viewBox="0 0 7 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:var="https://github.com/cascornelissen/svg-spritemap-webpack-plugin/"  xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 57.1 (83088) - https://sketch.com -->
    <title>icon/other/arrow/reverse</title>
    <desc>Created with Sketch.</desc>
    <g id="icon/other/arrow/reverse" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="icon/other/arrow/disabled" fill="#FFFFFF" fill-rule="nonzero">
            <path var:color.fill="#000" d="M6.78910369,5.92889908 L1.67486817,10.8233945 C1.55184519,10.9411316 1.40246057,11 1.22671351,11 C1.05096646,11 0.901581838,10.9411316 0.778558856,10.8233945 L0.198594004,10.2683486 C0.075571022,10.1506115 0.0096659251,10.0076454 0.000878712933,9.83944954 C-0.00790849923,9.67125369 0.0492089832,9.52828759 0.172231965,9.41055046 L4.25834797,5.5 L0.172231965,1.58944954 C0.0492089832,1.47171241 -0.00790849923,1.32874631 0.000878712933,1.16055046 C0.0096659251,0.992354612 0.075571022,0.849388508 0.198594004,0.731651376 L0.778558856,0.176605505 C0.901581838,0.0588683732 1.05096646,0 1.22671351,0 C1.40246057,0 1.55184519,0.0588683732 1.67486817,0.176605505 L6.78910369,5.07110092 C6.9297011,5.18883805 7,5.33180415 7,5.5 C7,5.66819585 6.9297011,5.81116195 6.78910369,5.92889908 Z" id=""></path>
        </g>
    </g>
</svg>
```

This allows you to use the color variables `var:color.fill="#000"` on path.

## Adjusting Formatting Configuration
This pattern uses [SVGO](https://github.com/svg/svgo) to format and optimize SVG
files. You can adjust the configuration at Particle's root in `/.svgo.yml`.
