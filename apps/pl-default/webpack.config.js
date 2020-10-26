/**
 * Pattern Lab-specific webpack config.
 */

const path = require('path');

const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');

// Plugins
const RunScriptOnFiletypeChange = require('../../tools/webpack/run-script-on-filetype-change');

// Constants: environment
const { NODE_ENV, PARTICLE_PL_HOST = '' } = process.env;
// Constants: root
const { PATH_DIST } = require('../../particle.root.config');

// Get design system config
const dsWebpackConfig = require('../../source/default/webpack.config');

const APP_NAME = 'app-pl';

// Webpack configuration unique to the Pattern Lab app
const plWebpackConfig = {
  entry: {
    app: [path.resolve(__dirname, 'index.js')],
  },
  output: {
    // Where CSS/JS/images live in pl dist/ folder
    path: path.join(PATH_DIST, APP_NAME, 'assets/'),
    // Since pl serves assets from a folder sibling to pl/, this is needed
    publicPath:
      NODE_ENV === 'development' ? `/${path.join(APP_NAME, 'assets/')}` : '',
  },
  module: {
    rules: [
      // PL-only assets on the dependency chain
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
      BUILD_TARGET: JSON.stringify(APP_NAME),
    }),
    // Recompile PL on any globed PL file (see glob.js)
    new RunScriptOnFiletypeChange({
      test: /\.(twig|yml|md|json)$/,
      exec: [`npm run pl`],
    }),
  ],
  // Webpack Dev Server config ONLY (Pattern Lab live-reload)
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    allowedHosts: ['.docksal', '.vm', '0.0.0.0', 'localhost'],
    // dev server starts from this folder.
    contentBase: PATH_DIST,
    // local host name for devServer
    public: PARTICLE_PL_HOST,
    // Refresh devServer when dist/ changes (Pattern Lab)
    watchContentBase: true,
    watchOptions: {
      // Ignore all folders inside dist/app-pl so pl rebuilds refresh.
      // Note: prevents Webpack from watching many pl files,
      ignored: /app-pl/,
    },
    // Open browser immediately
    open: true,
    // Open browser to the PL landing page so it's very clear where to go
    openPage: `${APP_NAME}/pl`,
    // Inject css/js into page without full refresh
    hot: true,
    // Finds default index.html files at folder root
    historyApiFallback: true,
    // Injects all the webpack dev server code right in the page
    inline: true,
  },
};

// In dev mode, make sure we use 'style-loader' instead of MiniCssExtractPlugin.loader
if (NODE_ENV === 'development') {
  // Find CSS loader rules
  const cssRuleIndex = dsWebpackConfig.module.rules.findIndex((rule) =>
    'test.css'.match(rule.test)
  );
  // Change MiniCssExtractPlugin.loader (always first) to 'style-loader'
  dsWebpackConfig.module.rules[cssRuleIndex].use[0] = 'style-loader';
}

// Merge together root, design system, and app webpack config
module.exports = merge(dsWebpackConfig, plWebpackConfig);
