const path = require('path');

const sassExportData = require('@theme-tools/sass-export-data');

const { sets } = require('./namespaces');

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
    // Shorthand to import modules, i.e. `import thing from 'atoms/thing';`
    alias: sets,
  },
};
