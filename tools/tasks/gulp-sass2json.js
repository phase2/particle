const path = require('path');
const through = require('through2');
const sassExtract = require('sass-extract');
const _ = require('lodash');

/**
 * Parse a sass file, discover all Sass vars, write to json
 * See https://github.com/contra/gulp-concat/blob/master/index.js for inspiration
 * @param fileName
 * @param opt
 * @returns {*}
 */
module.exports = function SassToJson(fileName, opt) {
  if (!fileName) {
    throw new Error('sass-to-json: missing file options');
  }
  // Options from caller
  const options = opt || {};
  // Pull off a search array like ['$c-', '$ff--', etc ]
  const search = _.map(options.sassVars, 'lineStartsWith');

  // Check last file modified
  let latestFile;
  let latestMod;

  // Holds the massive data object
  const sassVars = { baseScssVars: {} };

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

    sassExtract
      .render({
        file: vinylFile.path,
      })
      .then((rendered) => {
        // console.log(rendered.vars);

        // rendered.vars.global looks like:
        // {
        //   'fs--m': {
        //      type: 'SassNumber',
        //      value: 16,
        //      unit: 'px',
        //      source: ['/path/to/file.scss'],
        //      declarations: [Object]
        //    }
        // }
        const pickVars = _(rendered.vars.global)
          // Pick only vars that pass the inner test
          .pickBy((scssToJsonObject, scssToJsonKey) =>
            // Search through ['$c-', '$ff--', etc ], see if our key contains search terms
            _.some(search, searchItem => scssToJsonKey.startsWith(searchItem)))
          .value();
        // We are constantly merging the new values into the old values
        sassVars.baseScssVars = _.assign(sassVars.baseScssVars, pickVars);

        // 2. set new contents
        // * contents can only be a Buffer, Stream, or null
        // * This allows us to modify the vinyl file in memory and prevents the
        // * need to write back to the file system.
        // transformedFile.contents = new Buffer(JSON.stringify({hello: test}));

        callback();
      });
  }

  function endStream(callback) {
    if (!latestFile) {
      callback();
      return;
    }

    // A dumb file holder
    const outputFile = latestFile.clone({ contents: false });
    outputFile.path = path.join(latestFile.base, fileName);

    // Include our final json output
    outputFile.contents = Buffer.from(JSON.stringify(sassVars));

    // This apparently make the file available to write
    this.push(outputFile);

    callback();
  }

  return through.obj(bufferContents, endStream);
};
