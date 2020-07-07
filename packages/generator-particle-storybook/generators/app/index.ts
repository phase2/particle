// import { ConfigOptions } from './../../../particle-cli/src/types' // TODO perhaps install these types separately from the module instead of the path. IE npm install -D particle-cli or @types/particle-cli
import Generator from 'yeoman-generator'

module.exports = class extends Generator {
  answers = {
    frontendFramework: 'react', // comes from particle CLI
  }

  // // Prompts
  // async prompting() {
  //   this.log("Welcome to Particle's Drupal Theme Generator")

  //   // Answers should come from another generator (particle CLI)

  //   // const answers = await this.prompt([
  //   //   {
  //   //     type: 'input',
  //   //     name: 'themeName',
  //   //     message: 'What would you like to name your theme?',
  //   //     // Supply default-theme name from other project root config?
  //   //     default: 'particle',
  //   //   },
  //   // ])
  // }
  createPackageJson() {
    console.log('called create', this.answers)
  }

  blah() {
    console.log('called blah')
  }

  npmInstall() {
    console.log('called npm install')
  }
}
