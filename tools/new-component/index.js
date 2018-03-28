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
        'demo',
      ],
      default: [
        'twig',
        'scss',
        'js',
        'demo',
      ],
    }, {
      name: 'name',
      message: 'What shall we name it?',
      filter(answer) {
        return answer.replace(/ /g, '-').toLowerCase();
      },
    }];

    // Disabling some rules here to pass linting because the generator
    // needs 'this' and es6's lovely fat arrows nuke it.
    /* eslint-disable func-names, prefer-arrow-callback, no-param-reassign */
    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      props.dashlessName = props.name.replace(/-/g, '');
      props.underscoreName = props.name.replace(/-/g, '_');
      props.camelCaseName = _.camelCase(props.name);
      props.cleanPatternType = props.patternType.replace(/([0-9])\w+-/g, '');
      this.props = props;
    }.bind(this));
    /* eslint-enable func-names, prefer-arrow-callback, no-param-reassign */
  }

  writing() {
    const destPath = path.join(
      patternBase,
      this.props.patternType,
      this.props.patternSubType,
      this.props.name,
    );

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
        this.destinationPath(path.join(destPath, `_${this.props.name}.twig`)),
        this.props,
      );
    }

    if (_.includes(this.props.files, 'js')) {
      this.fs.copyTpl(
        this.templatePath('pattern.js'),
        this.destinationPath(path.join(destPath, 'index.js')),
        this.props,
      );

      this.fs.copyTpl(
        this.templatePath('pattern-test.js'),
        this.destinationPath(path.join(destPath, '__tests__', `${this.props.name}.test.js`)),
        this.props,
      );
    }

    if (_.includes(this.props.files, 'demo')) {
      this.fs.copyTpl(
        this.templatePath('demo-pattern.twig'),
        this.destinationPath(path.join(destPath, 'demo', `${this.props.name}s.twig`)),
        this.props,
      );
      this.fs.copyTpl(
        this.templatePath('demo-pattern.js'),
        this.destinationPath(path.join(destPath, 'demo', 'index.js')),
        this.props,
      );

      this.fs.copyTpl(
        this.templatePath('pattern.md'),
        this.destinationPath(path.join(destPath, 'demo', `${this.props.name}s.md`)),
        this.props,
      );

      this.fs.copyTpl(
        this.templatePath('pattern.yml'),
        this.destinationPath(path.join(destPath, 'demo', `${this.props.name}s.yml`)),
        this.props,
      );
    }

    console.log(`Your new component ${this.props.name} is being created. Please import it inside of source/design-system.js to see it on the chain.`);
  }
};
