const { join, relative } = require('path');
const { readdirSync, statSync, existsSync } = require('fs');

const Generator = require('yeoman-generator');
const { camelCase } = require('lodash');

const { PATH_APPS } = require('../../particle.root.config');

// An array of PL-app config objects
const plDsConnect = readdirSync(PATH_APPS, 'utf8').reduce((acc, folder) => {
  // We know it's a PL app if it has a patternlab-config.json file
  const plConfig = join(PATH_APPS, folder, 'patternlab-config.json');
  if (existsSync(plConfig)) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const config = require(join(PATH_APPS, folder, 'particle.app.config.js'));
    acc.push(config);
    return acc;
  }
  return acc;
}, []);

// This is built up
const componentPath = [];

const patternFeatures = ['twig', 'scss', 'js'];

const prompts = [
  {
    type: 'list',
    name: 'chooseApp',
    message:
      'To which PL (and connected design system) would you like to add this component?',
    choices: plDsConnect.map(({ APP_NAME }) => APP_NAME),
  },
  {
    type: 'list',
    name: 'patternType',
    message: 'Where would you like this new component?',
    choices({ chooseApp }) {
      // Design system folder
      const { APP_DESIGN_SYSTEM } = plDsConnect.find(
        ({ APP_NAME }) => APP_NAME === chooseApp
      );
      // Build up the path array
      componentPath.push(...[APP_DESIGN_SYSTEM, '_patterns']);
      // Return array of atomic folders
      return readdirSync(join(...componentPath), 'utf8').filter(folder =>
        statSync(join(...componentPath, folder)).isDirectory()
      );
    },
  },
  // {
  //   type: 'list',
  //   name: 'patternSubType',
  //   message: 'Where in here?',
  //   choices({ patternType }) {
  //     componentPath.push(patternType);
  //
  //     const subfolders = readdirSync(join(...componentPath), 'utf8').filter(
  //       folder => statSync(join(...componentPath, folder)).isDirectory()
  //     );
  //     return ['./'].concat(subfolders);
  //   },
  // },
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
    this.log(
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

    this.log(
      `Your new component ${name} is being created. It should be available in your bundle!`
    );
  }
};
