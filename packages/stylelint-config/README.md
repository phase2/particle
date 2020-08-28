# Phase2 Stylelint Config

Stylelint is a mordern linting tool that helps you to avoid errors and enforce
coding conventions in your styles. This configuration is the aggreed on rules
for Phase2 prjects and includes several rules to help developers get integrated
with styling frameworks and languages.

Configuratioin for sharing
[Stylelint](https://stylelint.io/user-guide/configure#extends) across projects.

## Installation and configuration

This package has a peerDependency of Stylint `>=13.6.0` to support both means of
extending the configuration.

**Install**

```shell
yarn add --dev stylelint @phase2/stylelint-config
```

```shell
npm i -D prettier @phase2/stylelint-config
```

### Configure

There are several ways to configure your project to use this configuration
depending on your preferences and if you want to override any of the settings it
provides.

```json
{
  "name": "my-cool-package",
  "version": "1.0.0",
  "stylelint": "@phase2/stylelint-config"
}
```

If you would like to override any of the settings in the config, use a JSON or
Javascript config file such as the examples `.stylelintrc` or `.stylelintrc.js`
below.

**.stylelintrc**

```json
{
  "extends": "@phase2/stylelint-config",
  "rules": {
    "indentation": "tab",
    "number-leading-zero": null
  }
}
```

**.stylelintrc.js**

```javascript
module.exports = {
  ...require('@phase2/stylint-config'),
  rules: {
    indentation: 'tab',
    numberLeadingZero: null,
  },
}
```
