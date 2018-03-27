const Generator = require('yeoman-generator');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');

const patternBase = ('./source/_patterns');

module.exports = class extends Generator {
  prompting() {
    console.log('Hi! This will help you build a component folder with assets.');
    console.log(`Templates for this are in: ${path.relative(process.cwd(), __dirname)} \n`);

    const prompts = [{
      type: 'list',
      name: 'patternType',
      message: 'Where would you like this new component?',
      choices: fs.readdirSync(patternBase, 'utf8'),
    }, {
      type: 'list',
      name: 'patternSubType',
      message: 'Where in here?',
      choices(answers) {
        const folder = path.join(patternBase, answers.patternType);
        const subfolders = fs.readdirSync(folder, 'utf8');
        return ['./'].concat(subfolders);
      },
    }, {
      type: 'checkbox',
      name: 'files',
      message: 'What files would you like in there?',
      choices: [
        'twig',
        'scss',
        'js',
        'md',
        'yml',
        'json',
      ],
      default: [
        'twig',
        'scss',
        'js',
      ],
    }, {
      name: 'name',
      message: 'What shall we name it?',
      filter(answer) {
        return answer.replace(/ /g, '-').toLowerCase();
      },
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      props.dashlessName = props.name.replace(/-/g, '');
      props.underscoreName = props.name.replace(/-/g, '_');
      props.camelCaseName = _.camelCase(props.name);
      this.props = props;
    }.bind(this));
  }

  writing() {
    const destPath = path.join(patternBase, this.props.patternType, this.props.patternSubType, this.props.name);

    if (_.includes(this.props.files, 'scss')) {
      this.fs.copyTpl(
        this.templatePath('_pattern.scss'),
        this.destinationPath(path.join(destPath, `_${this.props.name}.scss`)),
        this.props,
      );
    }

    if (_.includes(this.props.files, 'twig')) {
      this.fs.copyTpl(
        this.templatePath('_pattern.twig'),
        this.destinationPath(path.join(destPath, `${this.props.name}.twig`)),
        this.props,
      );
    }

    if (_.includes(this.props.files, 'json')) {
      this.fs.copyTpl(
        this.templatePath('pattern.json'),
        this.destinationPath(path.join(destPath, `${this.props.name}.json`)),
        this.props,
      );
    }

    if (_.includes(this.props.files, 'js')) {
      this.fs.copyTpl(
        this.templatePath('pattern.js'),
        this.destinationPath(path.join(destPath, 'index.js')),
        this.props,
      );
    }

    if (_.includes(this.props.files, 'md')) {
      this.fs.copyTpl(
        this.templatePath('pattern.md'),
        this.destinationPath(path.join(destPath, `${this.props.name}.md`)),
        this.props,
      );
    }

    if (_.includes(this.props.files, 'yml')) {
      this.fs.copyTpl(
        this.templatePath('pattern.yml'),
        this.destinationPath(path.join(destPath, `${this.props.name}.yml`)),
        this.props,
      );
    }

    //
    // if demo { create demo subfolder setup }

    // after creating component files add to design-system.js
    // add demo to demo-system.js
  }
};
