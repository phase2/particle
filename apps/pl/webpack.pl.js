/**
 * Pattern Lab-specific webpack config.
 */

// Library Imports
const path = require('path');
const { DefinePlugin } = require('webpack');

// Loaders
const sassExportData = require('@theme-tools/sass-export-data');

// Plugins
const RunScriptOnFiletypeChange = require('../../tools/webpack/run-script-on-filetype-change');

// Particle base settings
const particle = require('../../particle');

// Constants
const { NODE_ENV, PARTICLE_PL_HOST = '' } = process.env;
const { PATH_SOURCE, PATH_DIST } = require('../../config');

const shared = {
  entry: {
    'app-pl': [path.resolve(__dirname, 'index.js')],
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              // Used to generate JSON about variables like colors, fonts
              functions: sassExportData({
                name: 'export_data',
                path: path.resolve(PATH_SOURCE, '_data/'),
              }),
            },
          },
        ],
      },
      // Non-standard assets on the dependency chain
      {
        test: /\.(yml|md)$/,
        loader: 'file-loader',
        options: {
          emitFile: false,
        },
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      BUILD_TARGET: JSON.stringify('pl'),
    }),
  ],
};

const dev = {
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    allowedHosts: ['.docksal', '.vm', '0.0.0.0', 'localhost'],
    contentBase: PATH_DIST, // dev server starts from this folder.
    public: PARTICLE_PL_HOST, // local host name for devServer
    watchContentBase: true, // Refresh devServer when dist/ changes (Pattern Lab)
    watchOptions: {
      ignored: '/(node_modules|dist/pl)/',
    },
    open: false, // Open browser immediately
    openPage: 'pl', // Open browser to the PL landing page so it's very clear where to go
    hot: true, // Inject css/js into page without full refresh
    historyApiFallback: true, // Finds default index.html files at folder root
    inline: true, // Injects all the webpack dev server code right in the page
    // All stats available here: https://webpack.js.org/configuration/stats/
    stats: {
      depth: true,
      entrypoints: true,
      chunkModules: true,
      chunkOrigins: true,
      env: true,
      colors: true,
      hash: true,
      version: true,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: true,
      children: false,
      source: true,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: true,
    },
  },
  plugins: [
    // Recompile PL on any globbed PL file (see glob.js)
    new RunScriptOnFiletypeChange({
      test: /\.(twig|yml|md|json)$/,
      exec: ['npx gulp compile'],
    }),
  ],
};

const prod = {};

module.exports = particle(
  { shared, dev, prod },
  {
    cssMode: NODE_ENV === 'development' ? 'hot' : 'extract',
    entry: 'app-pl',
  }
);
