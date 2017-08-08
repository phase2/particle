const path = require('path');
const webpack = require('webpack');

module.exports ={
  entry: {
    'j-dash': ['jquery', 'lodash', './js/j-dash-window'],
    'pattern-lab': './js/pattern-lab.js',
    'drupal-theme': './js/drupal-theme.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dest'),
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   jQuery: 'jquery',
    // }),
    new webpack.optimize.CommonsChunkPlugin(
      {
        name: 'j-dash',
        minChunks: function (module) {
          console.log(module.context);
          // this assumes your vendor imports exist in the node_modules directory
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      },
    ),
  ],
};
