/**
 * Grav-specific webpack config common to dev and prod.
 */

const path = require('path');
const webpack = require('webpack');

const grav = {
  entry: {
    'app-grav': [
      path.resolve(__dirname, 'index.js'),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('grav'),
    }),
  ],
};

module.exports = grav;
