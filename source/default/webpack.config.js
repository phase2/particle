/**
 * Webpack config for design system
 */

const path = require('path');

const { merge } = require('webpack-merge');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const rootWebpackConfig = require('../../webpack.particle');
const namespaces = require('./namespaces');

// Merge root Webpack config with design system Webpack config
module.exports = merge(rootWebpackConfig, {
  plugins: [
    // Sprite system options
    new SVGSpritemapPlugin(
      path.resolve(namespaces.static, 'icons/svg/**/*.svg'),
      {
        output: {
          filename: 'images/spritemap.svg',
          svg4everybody: true,
          svgo: false,
        },
        styles: {
          filename: '~svg-icons.css',
        },
      }
    ),
  ],
  resolve: {
    // JavaScript can import other components via shorthand, eg:
    //   `import thing from 'atoms/thing';`
    alias: namespaces,
  },
});
