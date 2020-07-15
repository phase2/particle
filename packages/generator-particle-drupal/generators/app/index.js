const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  // Prompts
  async prompting() {
    this.log("Welcome to Particle's Drupal Theme Generator")

    const answers = await this.prompt([
      {
        type: 'input',
        name: 'themeName',
        message: 'What would you like to name your theme?',
        // Supply default-theme name from other project root config?
        default: 'particle',
      },
    ])
  }
}
