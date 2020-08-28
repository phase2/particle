# Phase2 Prettier Config

Prettier is an excellent tool to reduce bike shedding on code formatting. It
ships with reasonable defaults and reduces the time spent thinking about various
formatting issues that don't matter in the long term. There are several rules
which I prefer to override. As of v1.17 Prettier offers first class support for
shared configuration. This package shares my preferred base Prettier
configuration.

Configuration for sharing
[Prettier](https://prettier.io/docs/en/configuration.html#sharing-configurations)
across projects.

## Installation and configuration

This package has a peerDependency of Prettier `>=2.0.0` to support both means of
extending the configuration.

**Install:**

```shell
yarn add --dev prettier @phase2/prettier-config
```

```shell
npm i -D prettier @phase2/prettier-config
```

### Configure

There are several ways to configure your project to use this configuration
depending on your preferences and if you want to override any of the settings it
provides.

```json
{
  "name": "my-cool-package",
  "version": "1.0.0",
  "prettier": "@phase2/prettier-config"
}
```

You can also use any of the supported Prettier config extensions that can export
a string such as the example `.prettierrc.json` below.

```json
"@phase2/prettier-config"
```

If you would like to override any of the settings in the config, use a
JavaScript config file such as the example `.prettierrc.js` below.

```javascript
module.exports = {
  ...require('@phase2/prettier-config'),
  singleQuote: false,
}
```

That's it! You're off to the races on our custom rules.

## Issues

If you have any trouble, visit the
[issue](https://github.com/phase2/particle/issues) list.
