# SVG Pattern

The SVG is a special pattern in Particle that is designed to allow us to include
SVG files as CSS or inline. Furthermore, this pattern contains an `icons`
sub-directory that is optimized automatically via
[SVGO](https://github.com/svg/svgo). Developers can initiate this optimization
by running `npm run fmt:svg` or `npm run fmt`.

## Adding Icons SVG

To add an Icon SVG to the system, simply add it to
`source/default/static/icons/svg/` directory and run the format command. This
format step is **destructive**, so be aware of using source control to revert
unintended changes.

## Adjusting Formatting Configuration

This pattern uses [SVGO](https://github.com/svg/svgo) to format and optimize SVG
files. You can adjust the configuration at Particle's root in `/.svgo.yml`.
