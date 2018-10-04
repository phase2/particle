const ShellHelper = require('./phase2-node-shell-helper');

class RunScriptOnFiletypeChange extends ShellHelper {
  constructor(options) {
    super(options);
    this.startTime = Date.now();
    this.prevTimestamps = new Map();
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'RunScriptOnFiletypeChange',
      (compilation, callback) => {
        // Convert fileTimestamps to array of arrays to filter it and find
        // changed files we care about

        const changed = [...compilation.fileTimestamps].filter(([file]) => {
          // Uncomment to debug
          // if (file.match(this.options.test)) { console.log(file); }

          // Use our file regex to test, eject if not a file we care about
          if (!file.match(this.options.test)) {
            return false;
          }
          // Previous file timestamp
          const prevStamp = this.prevTimestamps.get(file) || this.startTime;
          // New timestamp value
          const nextStamp = compilation.fileTimestamps.get(file) || Infinity;
          // Only returns true if changed files are newer
          return prevStamp < nextStamp;
        });

        // Set stamps to new point
        this.prevTimestamps = compilation.fileTimestamps;

        // If none of the file types have changed, emit as usual
        if (!changed.length) {
          callback();
          return true;
        }

        // Bail if the file modified is not actually on the dep chain
        const isDep = changed.some(([changedFilePath]) =>
          compilation.fileDependencies.has(changedFilePath)
        );
        if (!isDep) {
          callback();
          return true;
        }

        // Run all commands synchronously
        this.options.exec.forEach(script => this.handleScript(script));

        // Run callback to finish compilation
        callback();

        // Fat arrow functions must return a value
        return true;
      }
    );
  }
}

module.exports = RunScriptOnFiletypeChange;
