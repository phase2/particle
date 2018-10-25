const Generator = require('yeoman-generator');
const { camelCase } = require('lodash');
const path = require('path');
const fs = require('fs');

let { PATH_SOURCE: componentPath } = require('../../config');

const ignoreFiles = ['.DS_Store', '.DS_Store?', '._.DS_Store', '._.DS_Store?'];

module.exports = class extends Generator {
  prompting() {
    console.log('Hi! This will help you build a component folder with assets.');
    console.log(
      `Templates for this are in: ${path.relative(process.cwd(), __dirname)} \n`
    );

    const prompts = [
      {
        type: 'list',
        name: 'designSystem',
        message:
          'To which design system would you like to add this new component?',
        choices: fs
          .readdirSync(componentPath, 'utf8')
          // Ignore trash files
          .filter(choicePath => !ignoreFiles.includes(choicePath)),
      },
      {
        type: 'list',
        name: 'patternType',
        message: 'Where would you like this new component?',
        choices(answers) {
          componentPath = path.join(
            componentPath,
            answers.designSystem,
            '_patterns'
          );
          return (
            fs
              .readdirSync(componentPath, 'utf8')
              // Ignore trash files
              .filter(choicePath => !ignoreFiles.includes(choicePath))
          );
        },
      },
      {
        type: 'list',
        name: 'patternSubType',
        message: 'Where in here?',
        choices(answers) {
          componentPath = path.join(componentPath, answers.patternType);
          const subfolders = fs
            .readdirSync(componentPath, 'utf8')
            // Ignore trash files
            .filter(choicePath => !ignoreFiles.includes(choicePath));
          return ['./'].concat(subfolders);
        },
      },
      {
        type: 'checkbox',
        name: 'files',
        message: 'What files would you like in there?',
        choices: ['twig', 'scss', 'js', 'demo'],
        default: ['twig', 'scss', 'js', 'demo'],
      },
      {
        name: 'name',
        message: 'What shall we name it?',
        filter(answer) {
          return answer.replace(/ /g, '-').toLowerCase();
        },
      },
    ];

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

    componentPath = path.join(componentPath, patternSubType, name);

    /*
     * generatorAssets has a key for each filetype that Particle creates.
     * Each of those is an array of objects, each of which must contain
     * the properties templatePath and destinationPath. These arrays are
     * looped over in the function below. The array pattern is necessary
     * to accomodate the varying number of files generated for each type.
     */

    const generatorAssets = {
      scss: [
        {
          templatePath: '_pattern.scss',
          destinationPath: path.join(componentPath, `_${name}.scss`),
        },
      ],
      twig: [
        {
          templatePath: '_pattern.twig',
          destinationPath: path.join(componentPath, `_${name}.twig`),
        },
      ],
      js: [
        {
          templatePath: 'pattern.js',
          destinationPath: path.join(componentPath, 'index.js'),
        },
        {
          templatePath: 'pattern-test.js',
          destinationPath: path.join(
            componentPath,
            '__tests__',
            `${name}.test.js`
          ),
        },
      ],
      demo: [
        {
          templatePath: 'demo-pattern.twig',
          destinationPath: path.join(componentPath, 'demo', `${name}s.twig`),
        },
        {
          templatePath: 'demo-pattern.js',
          destinationPath: path.join(componentPath, 'demo', 'index.js'),
        },
        {
          templatePath: 'pattern.md',
          destinationPath: path.join(componentPath, 'demo', `${name}s.md`),
        },
        {
          templatePath: 'pattern.yml',
          destinationPath: path.join(componentPath, 'demo', `${name}s.yml`),
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
      `Your new component ${name} is being created. Please import it inside of source/design-system.js to see it on the chain.`
    );
  }
};
