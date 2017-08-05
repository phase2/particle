const path = require('path');

module.exports ={
  entry: {
    'pattern-lab': './js/pattern-lab.js',
    'drupal-theme': './js/drupal-theme.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dest'),
  }
};
