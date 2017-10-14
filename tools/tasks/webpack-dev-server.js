const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

let wpds = null; // Hold a reference to Webpack Dev Server when it is created

/**
 * Starts up the Webpack Dev Server and does the config adjustments that this
 * command does:
 *   webpack-dev-server --hot --inline --progress
 *
 * Note the absolute requirements for Hot Module Reloading in this Dev Server:
 *  - HotModuleReplacementPlugin
 *  - Added entry points
 */
module.exports = function startWebpackDevServer(webpackConfig, localhost, devServerConfig) {
  return (cb) => {
    const localWebpackConfig = webpackConfig;

    // Add HotModuleReplacementPlugin to the end of the webpack plugins
    localWebpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    // Set these new entry points required for Hot Module replacement, prepended
    // with the original entry point
    localWebpackConfig.entry['pattern-lab'] = [
      ...webpackConfig.entry['pattern-lab'],
      ...['webpack/hot/dev-server', `webpack-dev-server/client?${localhost}/`],
    ];

    // Make a new server and store a reference to it so we can interact with it later
    wpds = new WebpackDevServer(webpack(localWebpackConfig), devServerConfig);

    wpds.listen(8080, 'localhost', (err) => {
      if (err) {
        cb(err);
        return false;
      }

      console.log(`Listening at ${localhost}`);
      cb();
      return true;
    });
  };
};
