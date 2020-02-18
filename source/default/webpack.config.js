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
                  // PostCSS PurgeCSS config for Tailwind
                  purgeCssConfig: {
                    content: [
                      path.resolve(__dirname, '_meta/**/*.*'),
                      path.resolve(__dirname, '_patterns/**/*.*'),
                    ],
                    defaultExtractor: content =>
                      content.match(/[A-Za-z0-9-_:/]+/g) || [],
                    extensions: ['yml', 'twig', 'tsx', 'jsx'],
                  },
                  // Use combined ltr/rtl in css for pl
                  // rtl: process.argv.includes('--pl-rtl'),
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
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
};
