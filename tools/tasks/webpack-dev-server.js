const url = require('url');
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
module.exports = function startWebpackDevServer(webpackConfig, devServerConfig) {
  return (cb) => {
    const localWebpackConfig = webpackConfig;
    const {
      entry: { 'pattern-lab' : plEntry }, // ./source/pattern-lab.js
      output: { publicPath: publicPath } // /temp/
    } = webpackConfig;

    const localDevServerConfig = devServerConfig;
    const { host, port } = localDevServerConfig;
    const localHost = `http://${host}:${port}`;
    // Ensure our public path is how we access these assets, ie http://localhost:8080/temp
    localDevServerConfig.publicPath = url.resolve(localHost, publicPath);

    // Add HotModuleReplacementPlugin to the end of the webpack plugins
    localWebpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    // Set these new entry points required for Hot Module replacement, prepended
    // with the original entry point
    localWebpackConfig.entry['pattern-lab'] = [
      ...plEntry,
      ...['webpack/hot/dev-server', `webpack-dev-server/client?${localHost}`],
    ];

    // Make a new server and store a reference to it so we can interact with it later
    wpds = new WebpackDevServer(webpack(localWebpackConfig), localDevServerConfig);

    wpds.listen(port, host, (err) => {
      if (err) {
        cb(err);
        return false;
      }

      console.info(`Listening at ${localHost}`);
      cb();
      return true;
    });
  };
};
