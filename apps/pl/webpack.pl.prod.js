/**
 * Pattern Lab-specific webpack config.
 * This is merged over top of webpack.shared.prod.js and
 * outputs compiled bundles to particle/dist/assets.
 */

// Library Imports
const merge = require('webpack-merge');
const webpack = require('webpack');

// Custom Imports
const shared = require('../../webpack.shared.prod.js');

const pl = {
  entry: {
    'app-pl': [
      path.resolve(__dirname, 'index.js'),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('pl'),
    }),
  ],
};

module.exports = merge(shared, pl);
