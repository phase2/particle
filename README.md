# Particle

This monorepo holds all packages dedicated to `@particle` packages.

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

## Installation

TBD

## Usage

TBD

## DEV Installation

### Steps

1. Clone the repo
1. Run `npm install`, This will install all dev dependencies and run the postinstall script `lerna:install` which runs `lerna bootstrap --nohoist` and installs all package dependencies.
1. If you update subdependencies, simply run `npm install` or `npm run lerna:install` to re-install lerna package dependencies. This is especially helpful when you are pulling in new code (with sub dependency additionas) from another branch.
1. `npm run build:watch` build the project in the dist folder
1. `npm run test:watch` to start jest in watch mode (recommended)

### Clean the repo

To remove package-lock.json from all levels of the repo simply run this command. PS is used to prevent grep from exiting as this throws an error with `lerna exec` even with the `--no-bail` flag.

```bash
ps -ef | (grep -q -s -R ^$1 package-lock.json && rm -rf package-lock.json) | { grep -v grep || true; }; lerna exec -- ps -ef | (grep -q -s -R ^$1 package-lock.json && rm -rf package-lock.json) | { grep -v grep || true; }
```

### Upgrading dependencies

- `npm run update:check`: similar to `npm outdated`, it will check for outdated dependencies inside the root and lerna packages.
- `npm run update:start`: initialized `npm-upgrade` for the root package and lerna packages. Allows for opting in to each upgrade with prompts.

### How to run a package script

```bash
npx lerna run --scope @phase2/particle-cli test
```
