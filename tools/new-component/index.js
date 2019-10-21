/**
 * @file
 *
 * Enfornce some of the business logic within Particle around components and
 * where they live.
 */

const { join, relative } = require('path');
const { readdirSync } = require('fs');

const Generator = require('yeoman-generator');
const { camelCase, kebabCase, snakeCase } = require('lodash');

const { PATH_APPS } = require('../../particle.root.config');

// The name of a file that indicates a Pattern Lab application
const PL_APP_CONFIG_FILE = 'patternlab-config.json';
// _patterns is sacred
const PATTERNS_FOLDER = '_patterns';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // Array of path segments where the component will eventually be created
    this.componentPath = [];
    // The chosen app
    this.particleApp = {};
  }

  // Helper methods in yeoman start with _
  _componentPathString(temp) {
    return temp
      ? join(...this.componentPath, temp)
      : join(...this.componentPath);
  }

  // Any non-underscore function between here are initializing() will run in order

  // Reserved: Check for apps and design systems
  initializing() {
    // Build out list of PL apps we want to present to user
    this.plConfigs = readdirSync(PATH_APPS, 'utf8').reduce((acc, folder) => {
      // We know it's a PL app if it has a patternlab-config.json file
      const plConfig = join(PATH_APPS, folder, PL_APP_CONFIG_FILE);
      if (this.fs.exists(plConfig)) {
        // Pull in config for this PL app
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const config = require(join(
          PATH_APPS,
          folder,
          'particle.app.config.js'
        ));

        return [...acc, config];
      }
      return acc;
    }, []);
  }

  // Reserved: present options to the user
  prompting() {
    const self = this;

    this.log(
      `Hi! This will help you build a component folder with assets. Templates for this are in: ${relative(
        process.cwd(),
        __dirname
      )}`
    );

    // Prompts presented to user
    const prompts = [
      {
        type: 'list',
        name: 'chooseApp',
        message:
          'To which Pattern Lab (and connected design system) would you like to add this component?',
        choices: self.plConfigs.map(({ APP_NAME }) => APP_NAME),
      },
      {
        type: 'list',
        name: 'patternType',
        message: 'Where would you like this new component?',
        choices({ chooseApp }) {
          console.log(self.plConfigs);
          // Design system folder
          const { APP_DESIGN_SYSTEM } = self.plConfigs.find(
            ({ APP_NAME }) => APP_NAME === chooseApp
          );
          // Build up the path array
          self.componentPath.push(...[APP_DESIGN_SYSTEM, PATTERNS_FOLDER]);
          // Return array of atomic folders
          return readdirSync(self._componentPathString(), {
            withFileTypes: true,
          }).filter(folder => folder.isDirectory());
        },
      },
      {
        name: 'name',
        message: 'What shall we name it?',
        filter(answer) {
          return kebabCase(answer);
        },
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = {
        ...props,
        dashlessName: props.name.replace(/-/g, ''),
        underscoreName: snakeCase(props.name),
        camelCaseName: camelCase(props.name),
        cleanPatternType: props.patternType.replace(/([0-9])\w+-/g, ''),
      };
    });
  }

  // Reserved: write out the results
  writing() {
    const { files, patternSubType, name } = this.props;

    // componentPath = join(componentPath, patternSubType, name);

    this.log(this.props);

    /*
     * generatorAssets has a key for each file type that Particle creates.
     * Each of those is an array of objects, each of which must contain
     * the properties templatePath and destinationPath. These arrays are
     * looped over in the function below. The array pattern is necessary
     * to accommodate the varying number of files generated for each type.
     */

    // const generatorAssets = {
    //   scss: [
    //     {
    //       templatePath: '_pattern.scss',
    //       destinationPath: join(componentPath, `_${name}.scss`),
    //     },
    //   ],
    //   twig: [
    //     {
    //       templatePath: '_pattern.twig',
    //       destinationPath: join(componentPath, `_${name}.twig`),
    //     },
    //   ],
    //   js: [
    //     {
    //       templatePath: 'pattern.js',
    //       destinationPath: join(componentPath, 'index.js'),
    //     },
    //     {
    //       templatePath: 'pattern-test.js',
    //       destinationPath: join(componentPath, '__tests__', `${name}.test.js`),
    //     },
    //   ],
    //   demo: [
    //     {
    //       templatePath: 'demo-pattern.twig',
    //       destinationPath: join(componentPath, 'demo', `${name}s.twig`),
    //     },
    //     {
    //       templatePath: 'demo-pattern.js',
    //       destinationPath: join(componentPath, 'demo', 'index.js'),
    //     },
    //     {
    //       templatePath: 'pattern.yml',
    //       destinationPath: join(componentPath, 'demo', `${name}s.yml`),
    //     },
    //   ],
    // };

    /* Loop over all the selected files and populate the template according to
     * the pattern structure in generatorAssets.
     */
    // files.forEach(fileType => {
    //   generatorAssets[fileType].forEach(file => {
    //     this.fs.copyTpl(
    //       this.templatePath(file.templatePath),
    //       this.destinationPath(file.destinationPath),
    //       this.props
    //     );
    //   });
    // });

    this.log(
      `Your new component ${name} is being created. It should be available in your bundle!`
    );
  }
};
