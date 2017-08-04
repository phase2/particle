'use strict';
// Docs: http://stylelint.io
// Style lint rule detail: https://github.com/stylelint/stylelint/tree/master/src/rules/RULE-NAME

module.exports = {
  plugins: [
    "stylelint-scss",
  ],
  ignoreFiles: [],
  rules: {
    "declaration-colon-space-after": "always",
    "declaration-no-important": true,
    "indentation": 2,
    "max-nesting-depth": 3,
    "selector-max-specificity": "0,3,3",
    "selector-max-id": 0,
    "scss/at-extend-no-missing-placeholder": true,
    "scss/selector-no-redundant-nesting-selector": true,
    "at-rule-no-vendor-prefix": true,
    "media-feature-name-no-vendor-prefix": true,
    "property-no-vendor-prefix": true,
    "selector-no-vendor-prefix": true,
    "value-no-vendor-prefix": true,
  },
};
