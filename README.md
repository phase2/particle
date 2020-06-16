# Particle

This monorepo holds all packages dedicated to `@particle` packages.

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

## Installation

### Steps

1. Run `npm install`, This will install all dev dependencies and run the postinstall script `lerna:boostrap` which will install all package dependencies.
2. If you update subdependencies, simply run `npm install` or `npm run lerna:bootstrap` to re-install lerna package dependencies. This is especially helpful when you are pulling in new code (with sub dependency additionas) from another branch.

### Note

- For the `lerna bootstrap` command, adding the `--hoist` flag will allow all dependencies to access npm packages of other modules. (something we may want to enable later on)

This will link all of the dependencies together and all npm packages on a top level node_modules.

MORE TBD

## Usage

TBD

### How to run a package script

```bash
npx lerna run --scope @phase2/particle-cli test
```
