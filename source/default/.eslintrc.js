const path = require('path');

module.exports = {
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: path.resolve(__dirname, './webpack.config.js'),
      },
    },
  },
};
