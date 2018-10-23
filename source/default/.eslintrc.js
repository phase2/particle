const path = require('path');

module.exports = {
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, './webpack.config.js'),
      },
    },
  },
};
