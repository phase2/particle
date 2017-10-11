const path = require('path');
const gulp = require('gulp');
const url = require('url');
const _ = require('lodash');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

// Add desired gulp tasks, originally defined in ./tools/tasks/
const scssTask = require('./tools/tasks/scss-to-json');
const namespaceTask = require('./tools/tasks/twig-namespaces');
const compileTask = require('./tools/tasks/pl-compile');

const scssToJsonWatchers = _.uniq(_.map(scssTask.scssToJsonOptions, 'src'));
scssTask.scssToJson(gulp);
namespaceTask.twigNamespaces(gulp);
compileTask.plCompile(gulp);

// Webpack Config
const wpconfig = require('./webpack.pl.config');

const localhost = 'http://localhost:8080';
let wpds = null; // Hold a reference to Webpack Dev Server when it is created

/**
 * Triggers a full reload of the Webpack Dev Server page.
 * @param cb
 * @returns {boolean}
 */
// function reloadWebpackDevServer(cb) {
//   // Bail if there is not a WPDS for some reason
//   if (wpds === null) {
//     cb();
//     return false;
//   }
//
//   console.log('Reload Webpack Dev Server!');
//
//   // Nukes the "state" hash
//   wpds.sockWrite(wpds.sockets, 'hash', 'asdfadsfads');
//   // Then sends the signal that compares the previous hash, causing a FULL refresh
//   wpds.sockWrite(wpds.sockets, 'ok');
//   cb();
//   return true;
// }

/**
 * Starts up the Webpack Dev Server and does the config adjustments that this
 * command does:
 *   webpack-dev-server --hot --inline --progress
 *
 * Note the absolute requirements for Hot Module Reloading in this Dev Server:
 *  - HotModuleReplacementPlugin
 *  - Added entry points
 */
gulp.task('webpack:server', (cb) => {
  // Add HotModuleReplacementPlugin to the end of the webpack plugins
  wpconfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Set these new entry points required for Hot Module replacement
  wpconfig.entry['pattern-lab'].unshift(
    'webpack/hot/dev-server',
    `webpack-dev-server/client?${localhost}/`,
  );

  // Make a new server and store a reference to it so we can interact with it later
  wpds = new WebpackDevServer(webpack(wpconfig), {
    // ie http://localhost:8080/temp
    publicPath: url.resolve(localhost, wpconfig.output.publicPath),
    // ie pattern-lab/public
    contentBase: path.resolve(__dirname, 'dist/', 'public/'),
    watchContentBase: true,
    hot: true,
    historyApiFallback: true,
    inline: true,
    stats: {
      colors: true,
      chunks: false,
    },
  });

  wpds.listen(8080, 'localhost', (err) => {
    if (err) {
      cb(err);
      return false;
    }

    console.log(`Listening at ${localhost}`);
    cb();
    return true;
  });
});

/**
 * Watch known PL files and compile to html. twig-namespaces ensures that
 * ./tools/pattern-lab/config.yml & ./theme.info.yml are updated with all
 * pattern namespaces for error-free compiling.
 *
 * @TODO: FIX SASS TO JSON TO ONLY WRITE FILE CHANGED, NOT ALL 5
 */
gulp.task('webpack:watch:pl-source', (cb) => {
  gulp.watch('source/**/*.{twig,json,yml,yaml,md}').on('change', gulp.series([
    'twig-namespaces',
    'pl-compile',
  ]));
  cb();
});

/**
 * Watch config-related scss files to generate json for PL example patterns.
 */
gulp.task('webpack:watch:scss-to-json', (cb) => {
  gulp.watch(scssToJsonWatchers)
    .on('change', gulp.series([
      'scss-to-json',
      'pl-compile',
    ]));
  cb();
});

/**
 * Wire tasks together
 */
gulp.task('webpack:dev', gulp.series([
  'webpack:server',
  'webpack:watch:scss-to-json',
  'webpack:watch:pl-source',
]));
