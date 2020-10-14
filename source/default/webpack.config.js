/**
 * Webpack config for design system
 */

const path = require('path');

const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const namespaces = require('./namespaces');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join('postcss.config.js'),
                ctx: {
                  // PostCSS Tailwind config
                  tailwindConfig: path.resolve(__dirname, 'tailwind.config.js'),
                },
              },
            },
          },
        ],
      },
    ],
  },
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
    extensions: ['.js', '.json'],
  },
};
