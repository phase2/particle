const path = require('path');
const webpack = require('webpack');

const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const sassExportData = require('@theme-tools/sass-export-data')({
  name: 'export_data',
  path: path.resolve(__dirname, 'source/_data/'),
});
const IconfontPlugin = require('webpack-iconfont-plugin');

module.exports = {
  // Commented out here since the specifics are different per PL or Drupal
  // entry: { 'entry-name': './path/to/entry.js', },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/temp/',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        include: [
          path.resolve(__dirname, 'source'),
          path.resolve(__dirname, 'drupal'),
        ],
        // use: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
                // minimize: {
                //   discardDuplicates: true,
                // }
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
                plugins: () => [
                  autoprefixer(),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                // Revisit the real or imagined performance hit here
                // includePaths: [
                //   path.resolve(__dirname, './source/_patterns'), // @import '00-base/base';
                // ],
                functions: sassExportData,
              },
            },
          ],
        })),
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      minChunks: 2,
    }),
    new ExtractTextPlugin({
      filename: '[name].styles.css',
      allChunks: true,
    }),
    new webpack.ProvidePlugin({
      // Bootstrap is dependant on jQuery and Popper, they must explicitly be provided by webpack.
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    // Named files instead of chunk IDs for HMR.
    new webpack.NamedModulesPlugin(),
    // Yell at us while writing Sass
    new StyleLintPlugin(),
    // Iconfont generation from SVGs
    new IconfontPlugin({
      svgs: path.resolve(__dirname, './source/_patterns/01-atoms/icon/svg/**/*.svg'),
      fonts: path.resolve(__dirname, './source/_patterns/01-atoms/icon/font/'),
      styles: path.resolve(__dirname, './source/_patterns/01-atoms/icon/scss/_icon-map-generated.scss'),
      template: path.resolve(__dirname, './source/_patterns/01-atoms/icon/templates/template.icon-map-generated.njk'),
      fontName: 'iconfont',
      normalize: true,
    }),
    // Ignore generated output if generated output is on a dependency chain (causes endless loop)
    new webpack.WatchIgnorePlugin([
      path.resolve(__dirname, './source/_patterns/01-atoms/icon/font/'),
      path.resolve(__dirname, './source/_patterns/01-atoms/icon/scss/_icon-map-generated.scss'),
    ]),
  ],
  resolve: {
    alias: {
      base: path.resolve(__dirname, './source/_patterns/00-base/'),
      atoms: path.resolve(__dirname, './source/_patterns/01-atoms/'),
      molecules: path.resolve(__dirname, './source/_patterns/02-molecules/'),
      organisms: path.resolve(__dirname, './source/_patterns/03-organisms/'),
      templates: path.resolve(__dirname, './source/_patterns/04-templates/'),
      pages: path.resolve(__dirname, './source/_patterns/05-pages/'),
    },
  },
};
