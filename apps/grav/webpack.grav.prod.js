/**
 * Grav-specific webpack config
 * This is merged over top of webpack.shared.config.js
 */

// Library Imports
const merge = require('webpack-merge');
const webpack = require('webpack');

// Custom Imports
const shared = require('../../webpack.particle.dev.js');

const grav = {
  mode: 'production',
  entry: {
    'app-grav': ['@babel/polyfill'],
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('grav'),
    }),
  ],
};

module.exports = merge.strategy({ 'entry.app-grav': 'prepend' })(shared, grav);
