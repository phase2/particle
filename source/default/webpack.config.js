/**
 * Webpack config for design system
 */
const path = require('path');

const sassExportData = require('@theme-tools/sass-export-data');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const { sets } = require('./namespaces');

const PATH_PATTERNS = path.resolve(__dirname, '_patterns');

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
              functions: sassExportData({
                name: 'export_data',
                path: path.resolve(__dirname, '_data/'),
              }),
              // Enable Sass to import other components via, eg:
              // `@import 01-atoms/thing/thing`
              includePaths: [PATH_PATTERNS],
              // ALL Sass partials should be provided with non-printing
              // variables, mixins, and functions
              data: '@import "00-protons/variables";',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Sprite system options
    new SVGSpritemapPlugin(
      path.resolve(PATH_PATTERNS, '01-atoms/svg/svg/**/*.svg'),
      {
        styles: {
          filename: path.resolve(
            PATH_PATTERNS,
            '01-atoms/svg/scss/_icons-generated.scss'
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
      }
    ),
  ],
  resolve: {
    // Shorthand to import modules, i.e. `import thing from 'atoms/thing';`
    alias: sets,
  },
};
