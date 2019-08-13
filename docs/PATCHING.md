# Patching Particle

It is possible to patch `node_modules` in use by Particle. This is particularly
useful for Node Pattern Lab 3, which at the time of writing is still in Beta.

## Requirements

* [patch package](https://www.npmjs.com/package/patch-package) adds the ability
to patch packages directly.

## Installation

* `npm i patch-package --save-dev`

## Usage

Add the following to your `package.json` file ins Particle:

```
 "scripts": {
  "postinstall": "patch-package"
 }
```

Make your changes **directly** in the `node_module` you wish to update. After
doing your work, simply run `npx patch-package package-name` to capture your
update. For example, you have patched a file in `@pattern-lab/core`, simply run
`npx patch-package @pattern-lab/core`. This generates a `patch` directory at the
root of Particle.

When you run `npm install`, the `patch-package` module will run with the
postinstall script above, patching your `npm` package with the source from the
`patches` directory. 

Make sure to monitor these patches for any stale patches and prune as projects
are updated.  
