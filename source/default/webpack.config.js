/**
 * Webpack config for design system
 */
const path = require('path');

const sassExportData = require('@theme-tools/sass-export-data');
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
            options: {
              // Used to generate JSON about variables like colors, fonts
              // @TODO: move to app/pl
              functions: sassExportData({
                name: 'export_data',
                path: path.resolve(__dirname, '_data/'),
              }),
              // ALL Sass partials will be provided with non-printing
              // variables, mixins, and functions
              data: '@import "~tokens/sass/non-printing/non-printing";',
            },
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
        svg4everybody: true,
        svgo: true,
      },
    }),
  ],
  resolve: {
    // JavaScript can import other components via shorthand, eg:
    //   `import thing from 'atoms/thing';`
    // Sass can import other components via shorthand:
    //   `@import ~atoms/thing/thing`
    // Note: Use the tilde (~), do not include trailing ".scss"
    alias: namespaces,
  },
};
