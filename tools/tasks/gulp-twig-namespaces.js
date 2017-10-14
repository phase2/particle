const path = require('path');
const through = require('through2');
const _ = require('lodash');

/**
 * Parse a sass file, discover all Sass vars, write to json
 * See https://github.com/contra/gulp-concat/blob/master/index.js for inspiration
 * @param fileName
 * @param opt
 * @returns {*}
 */
module.exports = function SassToJson(opt) {

  // Options from caller
  const options = opt || {};


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

    // A dumb file holder
    const outputFile = latestFile.clone({ contents: false });
    // Base appears to be removed when gulp.dest() runs. SO ADD IT.
    outputFile.path = path.join(latestFile.base, options.outputs[0].src);

    // Include our final json output
    outputFile.contents = Buffer.from('blerp');

    // This apparently make the file available to write
    this.push(outputFile);

    // Testing writing multiple to output
    const outputFileAgain = latestFile.clone({ contents: false });
    outputFileAgain.contents = Buffer.from('blerp derp');
    outputFileAgain.path = path.join(latestFile.base, options.outputs[1].src);
    console.log(outputFileAgain.path);
    this.push(outputFileAgain);

    callback();
  }

  return through.obj(bufferContents, endStream);
};
