/**
 * Webpack config for design system
 */

const path = require('path');

const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const namespaces = require('./namespaces');

// Constants: root
const { ASSETS_ATOMIC_FOLDER } = require('../../particle.root.config');

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
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: ASSETS_ATOMIC_FOLDER,
          context: path.resolve(__dirname),
          emit: true,
        },
      },
    ],
  },
  plugins: [
    // Sprite system options
    new SVGSpritemapPlugin(
      path.resolve(namespaces.atoms, 'svg/icons/**/*.svg'),
      {
        output: {
          filename: 'images/spritemap.svg',
          svg4everybody: true,
          svgo: true,
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
