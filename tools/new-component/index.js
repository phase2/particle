const Generator = require('yeoman-generator');
const camelCase = require('lodash.camelcase');
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

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      const updatedProps = { ...props };
      updatedProps.dashlessName = props.name.replace(/-/g, '');
      updatedProps.underscoreName = props.name.replace(/-/g, '_');
      updatedProps.camelCaseName = camelCase(props.name);
      updatedProps.cleanPatternType = props.patternType.replace(/([0-9])\w+-/g, '');
      this.props = updatedProps;
    });
  }

  writing() {
    const {
      files, patternType, patternSubType, name,
    } = this.props;

    const destPath = path.join(
      patternBase,
      patternType,
      patternSubType,
      name,
    );

    if (files.includes('scss')) {
      this.fs.copyTpl(
        this.templatePath('_pattern.scss'),
        this.destinationPath(path.join(destPath, `_${name}.scss`)),
        this.props,
      );
    }

    if (files.includes('twig')) {
      this.fs.copyTpl(
        this.templatePath('_pattern.twig'),
        this.destinationPath(path.join(destPath, `_${name}.twig`)),
        this.props,
      );
    }

    if (files.includes('js')) {
      this.fs.copyTpl(
        this.templatePath('pattern.js'),
        this.destinationPath(path.join(destPath, 'index.js')),
        this.props,
      );

      this.fs.copyTpl(
        this.templatePath('pattern-test.js'),
        this.destinationPath(path.join(destPath, '__tests__', `${name}.test.js`)),
        this.props,
      );
    }

    if (files.includes('demo')) {
      this.fs.copyTpl(
        this.templatePath('demo-pattern.twig'),
        this.destinationPath(path.join(destPath, 'demo', `${name}s.twig`)),
        this.props,
      );
      this.fs.copyTpl(
        this.templatePath('demo-pattern.js'),
        this.destinationPath(path.join(destPath, 'demo', 'index.js')),
        this.props,
      );

      this.fs.copyTpl(
        this.templatePath('pattern.md'),
        this.destinationPath(path.join(destPath, 'demo', `${name}s.md`)),
        this.props,
      );

      this.fs.copyTpl(
        this.templatePath('pattern.yml'),
        this.destinationPath(path.join(destPath, 'demo', `${name}s.yml`)),
        this.props,
      );
    }

    console.log(`Your new component ${name} is being created. Please import it inside of source/design-system.js to see it on the chain.`);
  }
};
