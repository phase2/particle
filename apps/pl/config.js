/**
 * App config
 */

const path = require('path');

const config = {
  APP_NAME: 'app-pl',
  APP_PATH: path.resolve(__dirname),
  APP_DESIGN_SYSTEM: path.resolve(__dirname, '../../source/default'),
  // Namespace formatting
  namespaces: {
    config: path.resolve(__dirname, 'pattern-lab/config/config.yml'),
    atKey: 'plugins.twigNamespaces.namespaces',
    transform: folderPath =>
      path.relative(path.join(config.APP_PATH, 'pattern-lab'), folderPath),
  },
};

module.exports = config;
