const path = require('path');

const config = {
  APP_NAME: 'app-drupal',
  APP_PATH: path.resolve(__dirname),
  APP_DESIGN_SYSTEM: path.resolve(__dirname, '../../source/default'),
  // Namespace formatting
  namespaces: {
    config: path.resolve(__dirname, 'particle.info.yml'),
    atKey: 'component-libraries',
    transform: folderPath => path.relative(config.APP_PATH, folderPath),
  },
};

module.exports = config;
