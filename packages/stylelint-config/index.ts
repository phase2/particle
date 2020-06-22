module.exports = {
  extends: [
    'stylelint-config-prettier'
  ],
  plugins: [
    'stylelint-scss',
  ],
  rules: {
    'indentation': 2,
    'declaration-colon-space-after': 'always',
    'declaration-no-important': true,
    'max-nesting-depth': 3,
    'selector-max-specificity': '0,3,3',
    'selector-max-id': 0,
    'scss/at-extend-no-missing-placeholder': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'at-rule-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'value-no-vendor-prefix': true
  },
};
