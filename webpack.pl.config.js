const merge = require('webpack-merge');
const shared = require('./webpack.shared.config');

const pl = {
  entry: {
    // 'design-system': './source/design-system/design-system.js',
    'pattern-lab': [
      './source/pattern-lab.js',
    ],
  },
};

module.exports = merge(shared, pl);
