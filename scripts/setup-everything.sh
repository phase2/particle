#!/bin/bash
cd `dirname $0`
cd .. # in repo root

# Ruby installs
if [[ -a "`which gem`" ]]; then
  echo ""
  echo "# Installing/Updating Bundler Ruby Gem"
  gem install bundler
  echo ""
  echo "# Installing other Gems via Bundler to ensure version parity between developers"
  bundle install
else
  echo "# ERROR: You need to have the command \"gem\" : install and try again: http://rubygems.org/pages/download"
  exit 1
fi

# Node installs
if [[ -a "`which npm`" ]]; then
  echo ""
#  echo "# Making sure we own ~/.npm so we can install packages without sudo later"
#  sudo chown -R `whoami` ~/.npm
  echo "# Installing Grunt CLI for easy task execution"
#  echo "We will need your admin password to install the grunt-cli"
#  npm install grunt-cli
  echo ""
  echo "# Installing Grunt Dependencies via node.js"
  npm install
  echo "# Installing bower components"
  bower install
else
  echo "# ERROR: You need to have node.js and the \"npm\" command installed. Get it here and try again: http://nodejs.org/download/"
  exit 1
fi

echo ""
echo "# Building Site"
grunt build
echo ""
echo "# Sass is compiled and Pattern Lab is built."

echo ""
echo "# All done! Go ahead and type \"grunt\" to kick off a full dev experience:"
echo "Sass/Compass Watch, Pattern Lab Watch, and Browser Auto Reload."
echo "Read the readme for more info"
echo "Enjoy!"
