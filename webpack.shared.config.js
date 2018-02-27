/**
 * Webpack shared config
 * The shared loaders, plugins, and processing that all our "apps" should use
 */

// Library Imports
const path = require('path');
const webpack = require('webpack');

// Custom Imports
const {
  PATH_SOURCE,
} = require('./config');

// Loaders
const autoprefixer = require('autoprefixer');
const sassExportData = require('@theme-tools/sass-export-data')({
  name: 'export_data',
  path: path.resolve(__dirname, 'source/_data/'),
});

// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
// const IconfontPlugin = require('webpack-iconfont-plugin');
// const FaviconsPlugin = require('favicons-webpack-plugin');

module.exports = {
  // See webpack.[drupal|pl].config.js for entry points
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/assets/'),
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 2 } },
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
          { loader: 'sass-loader', options: { sourceMap: true, functions: sassExportData } },
        ],
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
        // Do NOT babel transpile anything inside node_modules except BOOTSTRAP because we use
        // Bootstrap src modules that require transpiling. If you're not using Bootstrap, set this
        // line to: exclude: /node_modules/,
        exclude: /node_modules\/(?!(bootstrap)\/).*/,
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
        test: /\.(woff|woff2|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
  // optimization: {
  //   runtimeChunk: false,
  // },
  plugins: [
    // Provides "global" vars mapped to an actual dependency. Allows e.g. jQuery plugins to assume
    // that `window.jquery` is available
    new webpack.ProvidePlugin({
      // Bootstrap is dependant on jQuery and Popper
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    // Pulls out compile css to a standalone file
    new ExtractTextPlugin({
      filename: '[name].styles.css',
      allChunks: true,
    }),
    // Yell at us while writing Sass
    new StyleLintPlugin(),
    // Iconfont generation from SVGs
    // new IconfontPlugin({
    //   svgs: path.resolve(__dirname, PATH_SOURCE, '_patterns/01-atoms/icon/svg/**/*.svg'),
    //   fonts: path.resolve(__dirname, PATH_SOURCE, '_patterns/01-atoms/icon/font/'),
    // eslint-disable-next-line max-len
    //   styles: path.resolve(__dirname, PATH_SOURCE, '_patterns/01-atoms/icon/scss/_icon-map-generated.scss'),
    // eslint-disable-next-line max-len
    //   template: path.resolve(__dirname, PATH_SOURCE, '_patterns/01-atoms/icon/templates/template.icon-map-generated.njk'),
    //   fontName: 'iconfont',
    //   normalize: true,
    // }),
    // favicon generation
    // new FaviconsPlugin({
    //   // Your source logo
    //   logo: path.resolve(__dirname, PATH_SOURCE, '_patterns/01-atoms/image/logo.svg'),
    //   // The prefix for all image files (might be a folder or a name), include [hash] for hash
    //   prefix: 'favicons/',
    //   // Emit all stats of the generated icons
    //   emitStats: false,
    //   // The name of the json containing all favicon information, [hash] available here
    //   statsFilename: path.resolve(__dirname, PATH_SOURCE, '_data/favicons-stats.json'),
    //   // Generate a cache file with control hashes and
    //   // don't rebuild the favicons until those hashes change
    //   persistentCache: true,
    //   // Inject the html into the html-webpack-plugin
    //   inject: false,
    //   // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
    //   background: '#fff',
    //   // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
    //   title: 'Webpack App',
    //   // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
    //   icons: {
    //     android: false,
    //     appleIcon: false,
    //     appleStartup: false,
    //     coast: false,
    //     favicons: true,
    //     firefox: false,
    //     opengraph: false,
    //     twitter: false,
    //     yandex: false,
    //     windows: false,
    //   },
    // }),
    // Ignore generated output if generated output is on a dependency chain (causes endless loop)
    new webpack.WatchIgnorePlugin([
      path.resolve(__dirname, PATH_SOURCE, '_patterns/01-atoms/icon/font/'),
      path.resolve(__dirname, PATH_SOURCE, '_patterns/01-atoms/icon/scss/_icon-map-generated.scss'),
    ]),
  ],
  // Shorthand to import modules, i.e. `import thing from 'atoms/thing'`
  resolve: {
    alias: {
      protons: path.resolve(__dirname, PATH_SOURCE, '_patterns/00-protons/'),
      atoms: path.resolve(__dirname, PATH_SOURCE, '_patterns/01-atoms/'),
      molecules: path.resolve(__dirname, PATH_SOURCE, '_patterns/02-molecules/'),
      organisms: path.resolve(__dirname, PATH_SOURCE, '_patterns/03-organisms/'),
      templates: path.resolve(__dirname, PATH_SOURCE, '_patterns/04-templates/'),
      pages: path.resolve(__dirname, PATH_SOURCE, '_patterns/05-pages/'),
    },
  },
};
