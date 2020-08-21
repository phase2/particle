# @phase2/eslint-config

This package includes a collection of eslint configurations that adhere to Phase2's stylig guidelines. The eslint configurations have been made to be extendable based on what technologies are being utilized in a project. It manages the dependencies and configuration of various plugins which can then be extended into the source project. This reduces the overhead and duplication of managing configuration across many projects. It also reduces the number of dependencies each project must directly install and manage.

## Requirements and Installation

This configuration requires ESLint `>=7.0.0`. To install and use the configuration follow the steps below:

**Install**
If you are using yarn:
`yarn add --dev eslint @phase2/eslint-config`
If you are using npm
`npm install -D eslint @phase2/eslint-config`

**Configure**

```
// .eslintrc.js
module.exports = {
  extends: ['@phase2/eslint-config'],
  rules: {
    // Override any rules
  },
};
```

This root extension contains base configuration used for all projects.

## Additional Plugins/rules available

This package also provides configuration for other commonly used plugins and their associate rules. These are not included in the base configuration by default and can be added to the extends array on an as needed basis.

- **Cypress:** Configures ESLint to recognize Cypress globals and use the eslint-plugin-jest with accompanying rules. To use this ruleset, add `'@phase2/eslint-config/jest'` to the extends array in your ESLint config.
- **Jest:** Configures ESLint to recognize Jest globals and use the eslint-plugin-jest with accompanying rules. To use this ruleset, add `'@phase2/eslint-config/jest'` to the extends array in your ESLint config.
- **React:** Configures ESLint for React. Includes rules from eslint-plugin-react and eslint-plugin-react-hooks. To use this ruleset, add `'@phase2/eslint-config/react'` to the extends array in your ESLint config.
- **TypeScript:** Configures ESLint to work with TypeScript including disabling some base ESLint rules which do not interface well with TypeScript files. To use this ruleset, add `'@phase2/eslint-config/typescript'` to the extends array in your ESLint config.

## Integration with Prettier

Prettier provides consistent code format and can reduce common stylistic bike-shedding. This configuration installs Prettier though a Prettied config file is not provided.
