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
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'sass-loader',
            options: {},
          },
        ],
      },
    ],
  },
  plugins: [
    // Sprite system options
    new SVGSpritemapPlugin(path.resolve(namespaces.atoms, 'svg/svg/**/*.svg'), {
      styles: {
        filename: path.resolve(
          namespaces.atoms,
          'svg/scss/_icons-generated.scss'
        ),
        variables: {
          sizes: 'svgicon-sizes', // Prevent collision with Bootstrap $sizes
          variables: 'svgicon-variables',
        },
      },
      output: {
        filename: 'images/spritemap.svg',
        svg4everybody: true,
        svgo: true,
      },
    }),
  ],
  resolve: {
    // JavaScript can import other components via shorthand, eg:
    //   `import thing from 'atoms/thing';`
    // Sass can import other components via shorthand:
    //   `@use ~atoms/thing/thing`
    // Note: Use the tilde (~), do not include trailing ".scss"
    alias: namespaces,
  },
};
