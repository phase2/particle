const { exec } = require('child_process');

function RunScriptOnFiletypeChange(options) {
  this.options = options;
  this.startTime = Date.now();
  this.prevTimestamps = new Map();
}

RunScriptOnFiletypeChange.prototype.apply = function PatternLabPluginApply(compiler) {
  compiler.plugin('emit', (compilation, callback) => {
    // Convert fileTimestamps to array of arrays to filter it and find changed files we care about
    const changed = [...compilation.fileTimestamps].filter(([file]) => {
      // Debugging for now
      // if (file.match(this.options.test)) { console.log(file); }

      // Use our file regex to test, eject if not a file we care about
      if (!file.match(this.options.test)) { return false; }
      // Previous file timestamp
      const prevStamp = this.prevTimestamps.get(file) || this.startTime;
      // New timestamp value
      const nextStamp = compilation.fileTimestamps.get(file) || Infinity;
      // Only returns true if changed files are newer
      return prevStamp < nextStamp;
    });

    // Set stamps to new point
    this.prevTimestamps = compilation.fileTimestamps;

    // If nothing has changed, bail
    if (!changed.length) {
      callback();
      return true;
    }

    // Run the configured script, completing with callback
    exec(this.options.exec, (err, stdout, stderr) => {
      console.log(stdout);
      if (err) {
        console.log(stderr);
        callback();
        return false;
      }
      callback();
      return true;
    });

    // Fat arrow functions must return a value
    return true;
  });
};

module.exports = RunScriptOnFiletypeChange;
