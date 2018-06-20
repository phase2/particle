const { exec, spawnSync } = require('child_process');
const os = require('os');

class ShellHelper {
  constructor(options) {
    this.options = options;
  }

  static spreadStdoutAndStdErr(proc) {
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stdout);
  }

  static serializeScript(script) {
    if (typeof script === 'string') {
      const [command, ...args] = script.split(' ');
      return { command, args };
    }
    const { command, args } = script;
    return { command, args };
  }

  handleScript(script) {
    if (os.platform() === 'win32' || this.options.safe) {
      ShellHelper.spreadStdoutAndStdErr(exec(script, this.puts));
    } else {
      const { command, args } = ShellHelper.serializeScript(script);
      spawnSync(command, args, { stdio: 'inherit' });
    }
  }
}

module.exports = ShellHelper;
