const path = require('path');
const through = require('through2');
const _ = require('lodash');

/**
 * Parse a sass file, discover all Sass vars, write to json
 * See https://github.com/contra/gulp-concat/blob/master/index.js for inspiration
 * @param opt
 * @returns {*}
 */
module.exports = function SassToJson(opt) {

  // Options from caller
  const options = opt || {};

  const namespaces = _.reduce(options.sets, (result, value, key) => {
    // Format for yaml namespaces is:
    //
    // namespace:
    //   paths:
    //     - path1
    //     - path2
    const namespace = {
      [key]: {
        paths: [value.root]
      }
    };
    // Continuously assign this back into the result object
    return _.assign(result, namespace);
  }, {});

  console.log(namespaces);

  const filefolders = [];

  // Check last file modified
  let latestFile;
  let latestMod;

  // return a `through2` stream for `pipe()` compatibility at the node level
  function bufferContents(vinylFile, encoding, callback) {
    // ignore empty files
    if (vinylFile.isNull()) {
      callback();
      return;
    }

    // Set latest file if not already set,
    // or if the current file was modified more recently.
    if (!latestMod || (vinylFile.stat && vinylFile.stat.mtime > latestMod)) {
      latestFile = vinylFile;
      latestMod = vinylFile.stat && vinylFile.stat.mtime;
    }

    // cwd: /Users/illepic/dev/pattern-lab-starter
    // base: /Users/illepic/dev/pattern-lab-starter/source/_patterns/
    // path: /Users/illepic/dev/pattern-lab-starter/source/_patterns/00-base/demo/grids/_smart-grid.twig
    // console.log(vinylFile.path);
    // console.log(path.dirname(path.relative(options.outputs[0].pathRelativeToDir, vinylFile.path)));

    // i.e. source/_patterns/00-base/demo/typog/text
    filefolders.push(path.dirname(path.relative(vinylFile.cwd, vinylFile.path)));

    // 1. clone new vinyl file for manipulation
    // (See https://github.com/wearefractal/vinyl for vinyl attributes and functions)
    // const transformedFile = vinylFile.clone();
    // const rawScss = transformedFile.contents.toString('utf8');

    // 2. set new contents
    // * contents can only be a Buffer, Stream, or null
    // * This allows us to modify the vinyl file in memory and prevents the
    // * need to write back to the file system.
    // transformedFile.contents = new Buffer(JSON.stringify({hello: test}));
    callback();
  }

  function endStream(callback) {
    if (!latestFile) {
      callback();
      return;
    }

    console.log(namespaces);

    //
    const namespacesFull = _.reduce(options.sets, (result, namePath, name) => {
      const originalPaths = result[name].paths;

      result[name].paths = _(filefolders)
        // Only file paths that contain our namespace (ie atoms) path (ie source/_patterns/01-atoms)
        .filter(filefolder => filefolder.includes(namePath.root) && !filefolder.includes(namePath.ignore))
        // Add in the paths that were here before
        .concat(originalPaths)
        // 01-atoms should come before 01-atoms/blerp
        .sortBy(pathString => pathString.length)
        // Remove dupes
        .sortedUniq()
        // Break out of lodash object
        .value();

      return result;

    }, namespaces);

    console.log(namespacesFull);

    // NOW READ CONFIG FILES AND MESS WITH THEIR NAMESPACE KEY

    // A dumb file holder
    const outputFile = latestFile.clone({ contents: false });
    // Base appears to be removed when gulp.dest() runs. SO ADD IT.
    outputFile.path = path.join(latestFile.base, options.outputs[0].configFile);

    // Include our final json output
    outputFile.contents = Buffer.from('blerp');

    // This apparently make the file available to write
    this.push(outputFile);

    // Testing writing multiple to output
    const outputFileAgain = latestFile.clone({ contents: false });
    outputFileAgain.contents = Buffer.from('blerp derp');
    outputFileAgain.path = path.join(latestFile.base, options.outputs[1].configFile);
    // console.log(outputFileAgain.path);
    this.push(outputFileAgain);

    callback();
  }

  return through.obj(bufferContents, endStream);
};
