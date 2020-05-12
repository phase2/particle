const {resolve} = require('path');

module.exports = {
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: resolve(__dirname, './webpack.config.js'),
      },
    },
  },
};
