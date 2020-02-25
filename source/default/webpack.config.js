/**
 * Webpack config for design system
 */
const path = require('path');
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
                  // PostCSS PurgeCSS config for Tailwind
                  purgeCssConfig: {
                    content: [
                      path.resolve(__dirname, '_meta/**/*.*'),
                      path.resolve(__dirname, '_patterns/**/*.*'),
                    ],
                    defaultExtractor: content =>
                      content.match(/[A-Za-z0-9-_:/]+/g) || [],
                    extensions: ['yml', 'twig', 'jsx'],
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
  resolve: {
    // JavaScript can import other components via shorthand, eg:
    //   `import thing from 'atoms/thing';`
    alias: namespaces,
    extensions: ['.js', '.json'],
  },
};
