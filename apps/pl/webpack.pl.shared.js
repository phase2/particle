/**
 * Pattern Lab-specific webpack config common to dev and prod.
 */

const path = require('path');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');

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
    new WebpackShellPlugin({
      onBuildStart: [
        // Run gulp task DIRECTLY to create env.json
        'npx gulp compile:pl:env',
        // Full PL build
        'npx gulp compile',
      ],
    }),
  ],
};

module.exports = pl;
