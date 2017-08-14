const merge = require('webpack-merge');
const shared = require('./webpack.shared.config');

const pl = {
  entry: {
    'design-system': './source/design-system/design-system.js',
    'pattern-lab': './source/design-system/pattern-lab.js',
  },
};

module.exports = merge(shared, pl);


//
// module.exports = {
//   entry: {
//     'design-system': './source/design-system/design-system.js',
//     'pattern-lab': './source/design-system/pattern-lab.js',
//   },
//   output: {
//     filename: '[name].js',
//     path: path.resolve(__dirname, 'dest'),
//   },
//   devServer: {
//     contentBase: './'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(sass|scss)$/,
//         loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
//       }
//     ],
//   },
//   plugins: [
//     new webpack.optimize.CommonsChunkPlugin(
//       {
//         name: 'commons',
//         minChunks: 2,
//       },
//     ),
//     new ExtractTextPlugin({
//       filename: '[name].styles.css',
//       allChunks: true,
//     }),
//   ],
// };
