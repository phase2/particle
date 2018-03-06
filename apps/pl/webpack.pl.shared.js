/**
 * Pattern Lab-specific webpack config common to dev and prod.
 */

const path = require('path');
const webpack = require('webpack');

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

module.exports = pl;
