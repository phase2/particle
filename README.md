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
1. `npm run build:watch` build the project in the `packages/<PACKAGE_NAME>/lib` folder, packages that do not contain a .tsconfig and do not have a `tsc` and `tsc:build` script will be ignored lerna executes packages that contain only these scripts.
1. For all packages, simply execute the target file such as `node packages/particle-cli/lib/bin/particle-cli.js init` to run things, typescript must be compiled for typescript packages to execute
1. `npm run test:watch` to start jest in watch mode (recommended)

### Installing A Dependency

1. Run `npm run build`, build will fire off the `tsc` build script for all typescript repos in order of dependency chain. Example: `particle-types` has 0 internal dependencies but other typescript packages depend on it. We would need to run the compiler first on particle-types in order to be able to compile for other typescript packages.
1. Cd into `package/<PACKAGE_NAME>` and run `npm link`, this will link the **lib/bin** or `main/index.js` alias as an alias in your terminal. Example the bin is named (or aliased) `@phase2/particle-cli` therefore running `npx @phase2/particle-cli -v` will invoke the binary file `particle-cli`.
1. Alternatively use `node` to test out a dependency in lib. Example `node packages/particle-cli/lib/bin/particle-cli.js -V`

#### Example

```bash
npm install
cd packages/particle-cli;
npm link;
particle-cli -V;
```

### Clean the repo

To remove package-lock.json from all levels of the repo simply run this command. `ps` is used to prevent grep from exiting as this throws an error with `lerna exec` even with the `--no-bail` flag.

```bash
ps -ef | (grep -q -s -R ^$1 package-lock.json && rm -rf package-lock.json) | { grep -v grep || true; }; lerna exec -- ps -ef | (grep -q -s -R ^$1 package-lock.json && rm -rf package-lock.json) | { grep -v grep || true; }
```

To remove all typescript lib files run `npm dev:clean:lib`

To remove all node_modules in packages run `npm dev:clean:node_modules`

### Upgrading dependencies

- `npm run update:check`: similar to `npm outdated`, it will check for outdated dependencies inside the root and lerna packages.
- `npm run update:start`: initialized `npm-upgrade` for the root package and lerna packages. Allows for opting in to each upgrade with prompts.

### How to run a package script

```bash
npx lerna run --scope @phase2/particle-cli test
```
