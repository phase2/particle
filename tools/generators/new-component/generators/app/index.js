/* eslint-disable no-param-reassign */

/**
 * @file
 *
 * Enforce some of the business logic within Particle around components and
 * where they live.
 */

const { join, relative, extname } = require('path');
const { readdirSync } = require('fs');

const Generator = require('yeoman-generator');
const { camelCase, kebabCase, snakeCase } = require('lodash');
const rename = require('gulp-rename');

const { PATH_APPS } = require('../../../../../particle.root.config');

// The name of a file that indicates a Pattern Lab application
const PL_APP_CONFIG_FILE = 'patternlab-config.json';
// All Particle apps have a config file
const PARTICLE_APP_CONFIG_FILE = 'particle.app.config.js';
// _patterns is sacred
const PATTERNS_FOLDER = '_patterns';
// PL-specific folder within app
const PL_FOLDER = 'pattern-lab';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // The chosen app
    this.particleApp = {};
  }

  // Helper methods in yeoman start with _

  // Return path to the app's component folder
  get _appComponentPath() {
    const { name, patternType } = this.props;
    const { APP_PATH } = this.particleApp;

    return join(
      APP_PATH,
      PL_FOLDER,
      PATTERNS_FOLDER,
      `${patternType}-demo`,
      name
    );
  }

  // Return path to the design system's component folder
  get _dsComponentPath() {
    const { name, patternType } = this.props;
    const { APP_DESIGN_SYSTEM } = this.particleApp;

    return join(APP_DESIGN_SYSTEM, PATTERNS_FOLDER, patternType, name);
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
          PARTICLE_APP_CONFIG_FILE
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
          // Set the config for the app in a shared place
          self.particleApp = self.plConfigs.find(
            ({ APP_NAME }) => APP_NAME === chooseApp
          );
          // Design system folder
          const { APP_DESIGN_SYSTEM } = self.particleApp;

          // Return array of atomic folders within the app's design system
          return readdirSync(join(APP_DESIGN_SYSTEM, PATTERNS_FOLDER), {
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
        // 'name' already exists as kebab-case-name (dashes)
        underscoreName: snakeCase(props.name),
        camelCaseName: camelCase(props.name),
        cleanPatternType: props.patternType.replace(/([0-9])\w+-/g, ''),
      };
    });
  }

  // Reserved: write out the results
  writing() {
    const { name } = this.props;

    // Convert 'patterns.twig.ejs' to 'cards.twig'. registerTransformStream is
    // a reserved method to which Yeoman provides all file streams from copyTpl()
    this.registerTransformStream(
      rename(path => {
        // basename is 'patterns.twig' here
        const ext = extname(path.basename);
        // Original extname was '.ejs', change it to ext, which is now '.twig'
        path.extname = ext;
        // Remove extension ('.twig') from basename, replace 'pattern" with name
        path.basename = path.basename.replace(ext, '').replace('pattern', name);
        return path;
      })
    );

    // Copy and process all design system files
    this.fs.copyTpl(
      this.templatePath('ds/**/*.ejs'),
      this._dsComponentPath,
      this.props
    );
    // Copy and process all app files
    this.fs.copyTpl(
      this.templatePath('app/**/*.ejs'),
      this._appComponentPath,
      this.props
    );

    this.log(
      `Your new component ${name} is being created, both as a raw component within your design system and demo folder within your Pattern Lab.`
    );
  }
};
