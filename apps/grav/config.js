const path = require('path');

const config = {
  APP_NAME: 'app-grav',
  APP_PATH: path.resolve(__dirname),
  APP_DESIGN_SYSTEM: path.resolve(__dirname, '../../source/default'),
  // Namespace formatting
  namespaces: {
    config: path.resolve(__dirname, 'twig-namespaces.yaml'),
    atKey: 'namespaces',
    transform: folderPath =>
      path.join('user/themes/particle', path.relative('./', folderPath)),
  },
};

module.exports = config;
