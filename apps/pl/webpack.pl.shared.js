/**
 * Pattern Lab-specific webpack config common to dev and prod.
 */

const path = require('path');
const { spawn } = require('child_process');
const webpack = require('webpack');

// Commands that should run a single time BEFORE webpack compiles
const commands = [
  // PL startup compile
  'npx gulp compile:startup',
];

const pl = {
  entry: {
    'app-pl': [
      path.resolve(__dirname, 'index.js'),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('pl'),
    }),

    /**
     * Particle pre-webpack shell command plugin!
     */
    {
      apply: (compiler) => {
        /**
         * Shell command output, handle errors
         * @param {*} error
         * @param {*} stdout
         * @param {*} stderr
         */
        const puts = (error) => {
          if (error) {
            throw error;
          }
        };

        /**
         * Split a shell command into format needed for spawn()
         * @param {string} script - Command line command, ie `npx gulp compile`
         */
        const serializeScript = (script) => {
          // 'npx gulp compile' becomes:
          // ['npx', 'gulp', 'compile'] becomes:
          // {
          //   command: 'npx',
          //   args: ['gulp', 'compile'],
          // }
          const [command, ...args] = script.split(' ');
          return { command, args };
        };

        /**
         * Run a shell command
         * @param string script - Command line command, ie `npx gulp compile`
         */
        const handleScript = (script) => {
          const { command, args } = serializeScript(script);
          const proc = spawn(command, args, { stdio: 'inherit' });
          proc.on('close', puts);
        };

        compiler.hooks.entryOption.tap('ParticleShell', (option) => {
          console.log('🚀 Particle pre-webpack shell commands. 🚀');
          commands.forEach(command => handleScript(command));
        });
      },
    },
  ],
};

module.exports = pl;
