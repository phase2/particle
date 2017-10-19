const url = require('url');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const crypto = require('crypto');

/**
 * Starts up the Webpack Dev Server and does the config adjustments that this
 * command does:
 *   webpack-dev-server --hot --inline --progress
 *
 * Note the absolute requirements for Hot Module Reloading in this Dev Server:
 *  - HotModuleReplacementPlugin
 *  - Added entry points
 */
function startWebpackDevServer(webpackConfig, devServerConfig) {
  return (cb) => {
    const localWebpackConfig = webpackConfig;
    const {
      entry: { 'pattern-lab': plEntry }, // ./source/pattern-lab.js
      output: { publicPath }, // /temp/
    } = localWebpackConfig;

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
    const wpds = new WebpackDevServer(webpack(localWebpackConfig), localDevServerConfig);
    wpds.disableHostCheck = true;

    wpds.listen(port, host, (err) => {
      if (err) {
        cb(err);
      }

      console.info(`Listening at ${localHost}`);
      cb();
    });

    return wpds;
  };
}

/**
 * Take an instance of webpack dev server, send it random state. Causes reload.
 * @param server
 * @param cb
 */
function refreshWebpackDevServer(server, cb) {
  server.sockWrite(server.sockets, 'hash', crypto.randomBytes(20).toString('hex'));
  server.sockWrite(server.sockets, 'ok');
  cb();
}

module.exports = {
  startWebpackDevServer,
  refreshWebpackDevServer,
};
