#!/usr/bin/env node

var semver = require('semver');
var requiredVer = require('../package.json').devDependencies['p2-theme-core'];
var installedVer = require('p2-theme-core/package.json').version;
//console.log('requiredVer', requiredVer);
//console.log('installedVer', installedVer);
if (! semver.satisfies(installedVer, requiredVer)) {
  console.log('Installed version of "p2-theme-core" is old; updating...');
  var exec = require('child_process').execSync;
  console.log(exec('npm install', {encoding: 'utf8'}));
}
