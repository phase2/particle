const merge = require('webpack-merge');
const shared = require('./webpack.shared.config');

const drupal = {
  entry: {
    'drupal-theme': [
      './drupal/drupal-theme.js',
    ],
  },
  externals: {
    jquery: 'jQuery',
    lodash: '_',
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('drupal')
    }),
  ]
};

module.exports = merge(shared, drupal);
