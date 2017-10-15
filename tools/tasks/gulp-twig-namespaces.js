const path = require('path');
const through = require('through2');
const _ = require('lodash');
const yaml = require('js-yaml');
const fs = require('fs');

/**
 * Provide twig namespaces to any yaml file based on config
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

    // Set latest file if not already set, or if the current file was modified more recently.
    if (!latestMod || (vinylFile.stat && vinylFile.stat.mtime > latestMod)) {
      latestFile = vinylFile;
      latestMod = vinylFile.stat && vinylFile.stat.mtime;
    }

    // Get the proper path of this file, given:
    // cwd: /Users/illepic/dev/pattern-lab-starter
    // base: /Users/illepic/dev/pattern-lab-starter/source/_patterns/
    // path: /Users/illepic/dev/pattern-lab-starter/source/_patterns/00-base/demo/grids/_smart-grid.twig
    //
    // Want output like: i.e. source/_patterns/00-base/demo/typog/text
    filefolders.push(path.dirname(path.relative(vinylFile.cwd, vinylFile.path)));

    callback();
  }

  function endStream(callback) {
    if (!latestFile) {
      callback();
      return;
    }

    // console.log(namespaces);

    //
    const namespacesFull = _.reduce(options.sets, (result, namePath, name) => {
      result[name].paths = _(filefolders)
        // Only file paths that contain our namespace (ie atoms) path (ie source/_patterns/01-atoms)
        .filter(filefolder => filefolder.includes(namePath.root) && !filefolder.includes(namePath.ignore))
        // Add in the paths that were here before
        .concat(result[name].paths)
        // 01-atoms should come before 01-atoms/blerp
        .sortBy(pathString => pathString.length)
        // Remove dupes
        .sortedUniq()
        // Break out of lodash object
        .value();

      return result;

    }, namespaces);

    // Now we read config yaml from the filesystem, mutate it, write it back

    // Return an array of Buffer files from the "outputs" config
    const bufferFiles = _.map(options.outputs, (output) => {

      // UPDATE namespacesFull since we need to account for pathRelativeToDir
      const tempPaths = namespacesFull.molecules.paths;
      console.log(path.relative(output.pathRelativeToDir, tempPaths[0]));
      // const namespacesFullCustom = _.reduce(namespacesFull, (result, collection, name) => {
      //
      // }, );

      // Read the yaml right off the filesystem. Yes, it's sync. Makes this sane.
      const configFile = yaml.safeLoad(fs.readFileSync(output.configFile, 'utf8'));
      // The 'atKey' is in the lodash _.set() path format. Place the entire object we've been building
      _.set(configFile, output.atKey, namespacesFull);

      // Make a new file using a clone of one we have lying around.
      const outputFile = latestFile.clone({ contents: false });
      // Base appears to be removed when gulp.dest() runs. SO ADD IT.
      outputFile.path = path.join(latestFile.base, output.configFile);
      // Write it out in buffer safe way
      outputFile.contents = Buffer.from(yaml.safeDump(configFile));

      return outputFile;
    });

    // Push these files on to the array used by gulp.dest()
    bufferFiles.forEach(bufferFile => {
      this.push(bufferFile);
    });

    callback();
  }

  return through.obj(bufferContents, endStream);
};
