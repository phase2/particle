const path = require('path');
const through = require('through2');
const _ = require('lodash');
const yaml = require('js-yaml');
const fs = require('fs');

/**
 * Provide twig namespaces to any yaml file based on config
 * See https://github.com/contra/gulp-concat/blob/master/index.js for inspiration
 * @TODO: better docs about options here
 * @param opt
 * @returns {*}
 */
module.exports = function SassToJson(opt) {
  // Options from caller
  const options = opt || {};

  // Start by pulling off the paths mentioned in config
  // Will look like e.g. ['source/_patterns/00-base', 'source/_patterns/01-atoms, 'etc]
  const filefolders = _.map(options.sets, namePath => namePath.root);

  // Check last file modified
  let latestFile;
  let latestMod;

  // Return a `through2` stream for `pipe()` compatibility at the node level
  // Note that any manipulation of files must be done at .clone(), see
  // the gulp-concat repo mentioned above for notes
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
    // path: /Users/illepic/dev/pattern-lab-starter/source/_patterns/00-base/demo/grid/_grid.twig
    //
    // Want output like: i.e. source/_patterns/00-base/demo/type/text
    filefolders.push(path.dirname(path.relative(vinylFile.cwd, vinylFile.path)));

    callback();
  }

  function endStream(callback) {
    // Don't run any of this if there wasn't actually a file changed
    if (!latestFile) {
      callback();
      return;
    }

    // Return an array of Buffer files from the "outputs" config
    const bufferFiles = _.map(options.outputs, (output) => {
      // Build the namespaces object that looks like:
      // {
      //   atoms: {
      //     paths: ['source/_patterns/00-base', 'source/_patterns/01-atoms, 'etc],
      //   molecules: ...
      // }
      const namespaces = _.reduce(options.sets, (result, namePath, name) => {
        // Paths per namespace are unique to the ouput yaml files they will go into
        const paths = _(filefolders)
          // Only file paths in our namespace (ie atoms) path (ie source/_patterns/01-atoms)
          .filter(folderPath =>
            folderPath.includes(namePath.root) && !folderPath.includes(namePath.ignore))
          // 01-atoms should come before 01-atoms/blerp
          .sortBy(pathString => pathString.length)
          // Remove dupes
          .sortedUniq()
          // Modify path to be relative to pathRelativeToDir for yaml config
          .map(folderPath => path.relative(output.pathRelativeToDir, folderPath))
          // Break out of lodash object
          .value();

        // Each namespace object will be smashed into a result object, yaml format must be:
        // atoms:
        //   paths:
        //     - path/to/include
        //     - another/path/to/include
        const namespace = {
          [name]: {
            paths,
          },
        };

        // Continuously assign this back into the result object
        return _.assign(result, namespace);
      }, {});


      // Read the yaml right off the filesystem. Yes, it's sync. Makes this sane.
      const configFile = yaml.safeLoad(fs.readFileSync(output.configFile, 'utf8'));
      // The 'atKey' is in the lodash _.set() path format.
      _.set(configFile, output.atKey, namespaces);

      // Make a new file using a clone of one we have lying around.
      const outputFile = latestFile.clone({ contents: false });
      // Base appears to be removed when gulp.dest() runs. SO ADD IT.
      outputFile.path = path.join(latestFile.base, output.configFile);
      // Write it out in buffer safe way
      outputFile.contents = Buffer.from(yaml.safeDump(configFile));

      return outputFile;
    });

    // Push these files on to the array used by gulp.dest()
    bufferFiles.forEach(bufferFile => (this.push(bufferFile)));

    callback();
  }

  return through.obj(bufferContents, endStream);
};
