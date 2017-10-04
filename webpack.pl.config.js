const merge = require('webpack-merge');
const shared = require('./webpack.shared.config');

// Webpack Entry Points
const pl = {
  entry: {
    // 'design-system': './source/design-system/design-system.js',
    'pattern-lab': [
      './source/pattern-lab.js',
    ],
  },
};

module.exports = merge(shared, pl);
