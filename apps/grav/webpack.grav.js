/**
 * Grav-specific webpack config common to dev and prod.
 */

const path = require('path');
const webpack = require('webpack');

// Library Imports
const RunScriptAfterEmit = require('../../tools/webpack/run-script-after-emit');

// Custom Imports
const particle = require('../../particle');

const shared = {
  entry: {
    'app-grav': [path.resolve(__dirname, 'index.js')],
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('grav'),
    }),
  ],
};

const dev = {
  stats: {
    children: false,
    entrypoints: false,
  },
  plugins: [
    new RunScriptAfterEmit({
      exec: [
        `echo \n🚀 Webpack Grav ${process.env.NODE_ENV} build complete! 
        Edit apps/grav/webpack.grav.js to run run any command you need!
        Great for using tasks to re-generate twig-namespaces! 🚀\n`,
      ],
    }),
  ],
};

const prod = {};

module.exports = particle(
  { shared, dev, prod },
  {
    cssMode: 'extract',
    entry: 'app-grav',
  }
);
