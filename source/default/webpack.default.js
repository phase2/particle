const path = require('path');

const sassExportData = require('@theme-tools/sass-export-data');

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
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      // Shorthand to import modules, i.e. `import thing from 'atoms/thing';`
      protons: path.resolve(__dirname, '_patterns/', '00-protons/'),
      atoms: path.resolve(__dirname, '_patterns', '01-atoms/'),
      molecules: path.resolve(__dirname, '_patterns', '02-molecules/'),
      organisms: path.resolve(__dirname, '_patterns', '03-organisms/'),
      templates: path.resolve(__dirname, '_patterns', '04-templates/'),
      pages: path.resolve(__dirname, '_patterns', '05-pages/'),
    },
  },
};
