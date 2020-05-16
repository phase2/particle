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
                  // // PostCSS PurgeCSS config for Tailwind
                  // purgeCssConfig: {
                  //   content: [
                  //     path.resolve(__dirname, '_meta/**/*.*'),
                  //     path.resolve(__dirname, '_patterns/**/*.*'),
                  //     // From MC, should be moved to app version.
                  //     path.resolve('apps/node-pl/**/*.*'),
                  //   ],
                  //   // whitelistPatterns: [
                  //   //   /^bg/,
                  //   //   /^text/,
                  //   //   /:?-?m[xy]?-/,
                  //   //   /:?p[xy]?-/,
                  //   // ],
                  //   defaultExtractor: (content) =>
                  //     content.match(/[A-Za-z0-9-_:/]+/g) || [],
                  //   extensions: ['yml', 'twig', 'json'],
                  // },
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
    new SVGSpritemapPlugin(
      path.resolve(namespaces.atoms, 'svg/icons/**/*.svg'),
      {
        output: {
          filename: 'images/spritemap.svg',
          svg4everybody: true,
          svgo: true,
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
