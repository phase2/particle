const path = require('path');
const webpack = require('webpack');

module.exports ={
  entry: {
    'j-dash': './source/design-system/j-dash-window.js',
    'pattern-lab': './source/design-system/pattern-lab.js',
    'drupal-theme': './js/drupal-theme.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dest'),
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(
      {
        names: ['common', 'j-dash'],
        minChunks: 2,
      },
    ),
  ],
};
