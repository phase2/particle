const merge = require('webpack-merge');
const shared = require('./webpack.shared.config');

const drupal = {
  entry: {
    'design-system': './source/design-system/design-system.js',
    'drupal-theme': './theme-system/drupal-theme.js',
  },
  externals: {
    jquery: 'jQuery',
    lodash: '_',
  },
};

module.exports = merge(shared, drupal);
