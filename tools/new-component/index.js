const { join, relative } = require('path');
const { readdirSync, statSync } = require('fs');

const Generator = require('yeoman-generator');
const { camelCase } = require('lodash');

let { PATH_SOURCE: componentPath } = require('../../config');

const patternFeatures = ['twig', 'scss', 'js', 'demo'];
const prompts = [
  {
    type: 'list',
    name: 'designSystem',
    message: 'To which design system would you like to add this new component?',
    choices: readdirSync(componentPath, 'utf8').filter(folder =>
      statSync(join(componentPath, folder)).isDirectory()
    ),
  },
  {
    type: 'list',
    name: 'patternType',
    message: 'Where would you like this new component?',
    choices(answers) {
      componentPath = join(componentPath, answers.designSystem, '_patterns');
      return readdirSync(componentPath, 'utf8').filter(folder =>
        statSync(join(componentPath, folder)).isDirectory()
      );
    },
  },
  {
    type: 'list',
    name: 'patternSubType',
    message: 'Where in here?',
    choices(answers) {
      componentPath = join(componentPath, answers.patternType);
      const subfolders = readdirSync(componentPath, 'utf8').filter(folder =>
        statSync(join(componentPath, folder)).isDirectory()
      );
      return ['./'].concat(subfolders);
    },
  },
  {
    type: 'checkbox',
    name: 'files',
    message: 'What files would you like in there?',
    choices: patternFeatures,
    default: patternFeatures,
  },
  {
    name: 'name',
    message: 'What shall we name it?',
    filter(answer) {
      return answer.replace(/ /g, '-').toLowerCase();
    },
  },
];

module.exports = class extends Generator {
  prompting() {
    console.log(
      `Hi! This will help you build a component folder with assets.
      Templates for this are in: ${relative(process.cwd(), __dirname)}`
    );

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = {
        ...props,
        dashlessName: props.name.replace(/-/g, ''),
        underscoreName: props.name.replace(/-/g, '_'),
        camelCaseName: camelCase(props.name),
        cleanPatternType: props.patternType.replace(/([0-9])\w+-/g, ''),
      };
    });
  }

  writing() {
    const { files, patternSubType, name } = this.props;

    componentPath = join(componentPath, patternSubType, name);

    /*
     * generatorAssets has a key for each file type that Particle creates.
     * Each of those is an array of objects, each of which must contain
     * the properties templatePath and destinationPath. These arrays are
     * looped over in the function below. The array pattern is necessary
     * to accommodate the varying number of files generated for each type.
     */

    const generatorAssets = {
      scss: [
        {
          templatePath: '_pattern.scss',
          destinationPath: join(componentPath, `_${name}.scss`),
        },
      ],
      twig: [
        {
          templatePath: '_pattern.twig',
          destinationPath: join(componentPath, `_${name}.twig`),
        },
      ],
      js: [
        {
          templatePath: 'pattern.js',
          destinationPath: join(componentPath, 'index.js'),
        },
        {
          templatePath: 'pattern-test.js',
          destinationPath: join(componentPath, '__tests__', `${name}.test.js`),
        },
      ],
      demo: [
        {
          templatePath: 'demo-pattern.twig',
          destinationPath: join(componentPath, 'demo', `${name}s.twig`),
        },
        {
          templatePath: 'demo-pattern.js',
          destinationPath: join(componentPath, 'demo', 'index.js'),
        },
        {
          templatePath: 'pattern.md',
          destinationPath: join(componentPath, 'demo', `${name}s.md`),
        },
        {
          templatePath: 'pattern.yml',
          destinationPath: join(componentPath, 'demo', `${name}s.yml`),
        },
      ],
    };

    /* Loop over all the selected files and populate the template according to
     * the pattern structure in generatorAssets.
     */
    files.forEach(fileType => {
      generatorAssets[fileType].forEach(file => {
        this.fs.copyTpl(
          this.templatePath(file.templatePath),
          this.destinationPath(file.destinationPath),
          this.props
        );
      });
    });

    console.log(
      `Your new component ${name} is being created. It should be available in your bundle!`
    );
  }
};
