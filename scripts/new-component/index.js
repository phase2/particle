'use strict';
var yeoman = require('yeoman-generator');
var includes = require('lodash.includes');
var path = require('path');
var fs = require('fs');
var plBase = ('./source/_patterns');

module.exports = yeoman.Base.extend({
  prompting: function () {

    console.log('Hi! This will help you build a component folder with assets.');
    console.log('Templates for this are in: ' + path.relative(process.cwd(), __dirname));
    console.log('');

    var prompts = [{
      type: 'list',
      name: 'patternType',
      message: 'Where would you like this new component?',
      choices: fs.readdirSync(plBase, 'utf8')
    }, {
      type: 'list',
      name: 'patternSubType',
      message: 'Where in here?',
      choices: function(answers) {
        var folder = path.join(plBase, answers.patternType);
        var subfolders = fs.readdirSync(folder, 'utf8');
        return ['./'].concat(subfolders);
      }
    }, {
      type: 'checkbox',
      name: 'files',
      message: 'What files would you like in there?',
      choices: [
        'twig',
        'scss',
        'json',
        'js',
        'md'
      ],
      default: [
        'twig',
        'json',
        'scss'
      ]
    }, {
      name: 'name',
      message: 'What shall we name it?',
      filter: function(answer) {
        return answer.replace(/ /g, '-').toLowerCase();
      }
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      props.dashlessName = props.name.replace(/-/g, '');
      this.props = props;
    }.bind(this));
  },

  writing: function () {

    // console.log(this.props);
    var destPath = path.join(plBase, this.props.patternType, this.props.patternSubType, this.props.name);

    if (includes(this.props.files, 'scss')) {
      this.fs.copyTpl(
        this.templatePath('_pattern.scss'),
        this.destinationPath(path.join(destPath, '_' + this.props.name + '.scss')),
        this.props
      );
    }

    if (includes(this.props.files, 'twig')) {
      this.fs.copyTpl(
        this.templatePath('pattern.twig'),
        this.destinationPath(path.join(destPath, this.props.name + '.twig')),
        this.props
      );
    }

    if (includes(this.props.files, 'json')) {
      this.fs.copyTpl(
        this.templatePath('pattern.json'),
        this.destinationPath(path.join(destPath, this.props.name + '.json')),
        this.props
      );
    }

    if (includes(this.props.files, 'js')) {
      this.fs.copyTpl(
        this.templatePath('pattern.js'),
        this.destinationPath(path.join(destPath, this.props.name + '.js')),
        this.props
      );
    }

    if (includes(this.props.files, 'md')) {
      this.fs.copyTpl(
        this.templatePath('pattern.md'),
        this.destinationPath(path.join(destPath, this.props.name + '.md')),
        this.props
      );
    }

  }

});
