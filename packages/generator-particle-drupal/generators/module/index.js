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

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    try {
      const config = fs.readFileSync(
        path.join(this.destinationPath(), '.particlerc.json'),
        'utf8'
      );
      const { projectName, drupalModulePath } = JSON.parse(config);
      this.config.defaults({ projectName, drupalModulePath });
    } catch (e) {
      this.log(chalk.bgRed(`Skipping Particle Defaults: ${e}`));
    }
  }

  // Prompts
  async prompting() {
    this.log(chalk.bgBlue(`Welcome to Particle's Helper Module Generator`));

    const answers = [
      {
        type: 'input',
        name: 'moduleName',
        message: 'What would you like to name your module?',
        default: this.config.get('projectName')
          ? `${this.config.get('projectName')} Theme Helper`
          : 'Particle Helper',
      },
      {
        type: 'input',
        name: 'moduleDescription',
        message: 'What description should we give your module?',
        default: this.config.get('moduleDescription')
          ? this.config.get('moduleDescription')
          : `A helper module for ${this.config.get('projectName')} themes.`,
      },
      {
        type: 'input',
        name: 'drupalModulePath',
        message: 'Where should we write your Drupal module?',
        default: this.config.get('drupalModulePath')
          ? this.config.get('drupalModulePath')
          : 'project/modules',
      },
      {
        type: 'input',
        name: 'themeName',
        message: 'What is the name of the attached theme?',
        default: this.config.get('projectName')
          ? `${this.config.get('projectName')} Theme`
          : 'Particle',
      },
    ];

    return this.prompt(answers).then((props) => {
      this.props = {
        ...props,
        moduleNameTitle: startCase(props.moduleName),
        moduleNamePascal: upperFirst(camelCase(props.moduleName)),
        moduleNameSnake: snakeCase(props.moduleName),
        moduleNameKebab: kebabCase(props.moduleName),
        drupalModuleWritePath: `${props.drupalModulePath}/${snakeCase(
          props.moduleName
        )}`,
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
        path.basename = path.basename.replace('_dot', '.');
        path.basename = path.basename.replace(
          '_snake_case',
          this.props.moduleNameSnake
        );
        path.basename = path.basename.replace(
          '_pascal_case',
          this.props.moduleNamePascal
        );
        path.dirname = path.dirname.replace(
          '_pascal_case',
          this.props.moduleNamePascal
        );
        return path;
      })
    );

    this.fs.copyTpl(
      this.templatePath(),
      path.join(this.destinationPath(this.props.drupalModuleWritePath)),
      this.props
    );

    this.log(
      chalk.bgGreen(
        `Your Drupal Module "${this.props.moduleNameKebab}" has been created!`
      )
    );
  }
};
