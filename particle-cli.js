const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const { argv } = require('yargs');

clear();

console.log(
  chalk.blue(
    figlet.textSync('~~Particle~~', {
      horizontalLayout: 'full',
    })
  )
);

console.log(argv.app);
console.log(argv.mode);
