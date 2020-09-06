# SVG Pattern

This SVG directory is a special static assets directory in Particle that is
designed to allow us to include SVG as CSS or inline. Furthermore, this pattern
is setup to be optimized as a developer step via `npm run fmt:svg` or
`npm run fmt`.

## Adding SVG

To add an SVG to the system, simply add it to `/source/urban/static/icons/svg/`
directory and run the format command. This step is **destructive**, so be aware
of using source control to revert unintended changes.

## Adjusting Formatting Configuration

This pattern uses [SVGO](https://github.com/svg/svgo) to format and optimize SVG
files. You can adjust the configuration at Particle's root in `/.svgo.yml`.
