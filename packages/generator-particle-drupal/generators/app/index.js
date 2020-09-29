const Generator = require('yeoman-generator');

// Module Dependencies
const chalk = require('chalk');
const {
  camelCase,
  kebabCase,
  snakeCase,
  startCase,
  upperFirst,
} = require('lodash');
const path = require('path');
const fs = require('fs');
const rename = require('gulp-rename');

// Logo for Terminal Output
const logo = require('../../logo');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  // Initialize config from Particle if it exists.
  initializing() {
    try {
      const config = fs.readFileSync(
        path.join(this.destinationPath(), '.particlerc.json'),
        'utf8'
      );
      const { projectName, drupalThemePath, drupalDist } = JSON.parse(config);
      this.config.defaults({ projectName, drupalThemePath, drupalDist });
    } catch (e) {
      this.log(chalk.bgRed(`Skipping Particle Defaults: ${e}`));
    }
  }

  // Prompts
  async prompting() {
    this.log(logo);
    this.log(chalk.bgBlue(`Welcome to Particle's Drupal Theme Generator`));
    const answers = [
      {
        type: 'input',
        name: 'themeName',
        message: 'What would you like to name your theme?',
        default: this.config.get('projectName')
          ? `${this.config.get('projectName')} Theme`
          : 'Particle',
      },
      {
        type: 'input',
        name: 'themeDescription',
        message: 'What description should we give your theme?',
        default: this.config.get('themeDescription'),
      },
      {
        type: 'input',
        name: 'drupalThemePath',
        message: 'Where should we write your Drupal theme?',
        default: this.config.get('drupalThemePath'),
      },
      {
        type: 'input',
        name: 'drupalDist',
        message:
          'Where relative path from the drupal theme will you compile drupal assets (ex: "/dist")?',
        default: this.config.get('drupalDist'),
      },
    ];

    return this.prompt(answers).then((props) => {
      this.props = {
        ...props,
        themeNameTitle: startCase(props.themeName),
        themeNamePascal: upperFirst(camelCase(props.themeName)),
        themeNameSnake: snakeCase(props.themeName),
        themeNameKebab: kebabCase(props.themeName),
      };
    });
  }

  writing() {
    // Update our yo configuration from props.
    this.config.set(this.props);

    // Transform file case for incoming files.
    this.registerTransformStream(
      rename((path) => {
        // Retain dot files.
        path.basename = path.basename.replace(
          '_dot',
          '.'
        );
        path.basename = path.basename.replace(
          '_snake_case',
          this.props.themeNameSnake
        );
        path.basename = path.basename.replace(
          '_pascal_case',
          this.props.themeNamePascal
        );
        return path;
      })
    );

    this.fs.copyTpl(
      this.templatePath(),
      path.join(this.destinationPath(this.props.drupalThemePath)),
      this.props
    );

    this.log(
      chalk.bgGreen(
        `Your Drupal Theme "${this.props.themeNameKebab}" has been created!`
      )
    );
  }
};
