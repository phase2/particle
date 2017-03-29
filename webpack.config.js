const path = require('path');

module.exports = {
  entry: {
    'theme-main-entry': './js/main-entry',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dest'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
