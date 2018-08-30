const ShellHelper = require('./phase2-node-shell-helper');

class RunScriptAfterEmit extends ShellHelper {
  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync(
      'RunScriptAfterEmit',
      (compilation, callback) => {
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

module.exports = RunScriptAfterEmit;
