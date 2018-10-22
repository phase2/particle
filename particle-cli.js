/* eslint-disable import/no-dynamic-require, global-require */
const { readdirSync, existsSync } = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const { argv } = require('yargs');

const ShellHelper = require('./tools/webpack/phase2-node-shell-helper');

const { PATH_APPS } = require('./config');

// clear();

// console.log(
//   chalk.blue(
//     figlet.textSync('~~Particle~~', {
//       horizontalLayout: 'full',
//     })
//   )
// );

const allApps = readdirSync(PATH_APPS)
  .map(appFolder => {
    const configPath = path.join(PATH_APPS, appFolder, 'config.js');
    if (!existsSync(configPath)) {
      return null;
    }
    return require(configPath);
  })
  .filter(app => !!app);

// console.log(allApps);

const currentApp = allApps.filter(({ APP_NAME }) => APP_NAME === argv.app);
// console.log(currentApp);

// const particleScript = new ShellHelper({});
// particleScript.handleScript('gulp --tasks');

spawnSync('gulp', ['compile:startup', '--config', './apps/pl/config.js'], {
  stdio: 'inherit',
});

console.log(argv.app);
console.log(argv.mode);
console.log(process.env.NODE_ENV);
