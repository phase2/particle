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
      ({ fileDependencies, fileTimestamps }, callback) => {
        // Convert fileTimestamps to array of arrays to find changed files.
        //  `changed` looks like [filePath, timeStamp]
        const changed = [...fileTimestamps].find(([file, stamp]) => {
          // Use our file regex to test, eject if not a file we care about
          if (!file.match(this.options.test)) {
            return false;
          }
          // Bail if the file modified is not actually on the dep chain
          if (!fileDependencies.has(file)) {
            return false;
          }

          // Previous file timestamp
          const prevStamp = this.prevTimestamps.get(file) || this.startTime;
          // New timestamp value
          const nextStamp = stamp || Infinity;
          // Only returns true if changed files are newer
          return prevStamp < nextStamp;
        });

        // Set stamps to new point
        this.prevTimestamps = fileTimestamps;

        // If none of the file types have changed, emit as usual
        if (!changed) {
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
