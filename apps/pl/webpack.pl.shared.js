/**
 * Pattern Lab-specific webpack config common to dev and prod.
 */

const path = require('path');
const { spawnSync } = require('child_process');
const webpack = require('webpack');

const pl = {
  entry: {
    'app-pl': [path.resolve(__dirname, 'index.js')],
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('pl'),
    }),
  ],
};

// Build Pattern Lab
console.info(`🚀 Pattern Lab ${process.env.NODE_ENV} build running! 🚀`);
// Run `npx gulp compile:startup`
spawnSync('npx', ['gulp', 'compile:startup'], { stdio: 'inherit' });

module.exports = pl;
