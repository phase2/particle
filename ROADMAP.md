# Roadmap

## Goal
The project goal is to provide a project-init tool and scaffolding to integrate
technology. Particle is the glue between component library software and apps,
providing a config based approach to managing and exporting your front-end code.
The goal of the monorepo approach here is to provide each feature as a standalone
`npm` package. The result of which is an integrated CLI for managing config and
series of Yeoman Generators to abstract and scaffold initial codebase.

Where possible, all configuration has an upgrade path whereas generated code
belongs solely to the project. In this way `particle` projects have an **upgrade**
path in project configuration. Further CLI updates will `extract` all custom
code to easily reset a project as well as enable `publish`

## Stage 1 / MVP
* Integrate TypeScript for Project Development

* Abstract / Package JS Config
  * Create Custom ESLINT Config 
  [Package](https://eslint.org/docs/developer-guide/shareable-configs). 
  * Create Webpack [Scaffold](https://webpack.js.org/guides/scaffolding/). 

* `@phase2/particle-cli create`: Initializes particle enabled project. 
This command is responsible for:
  * Write `particle.config.json`: Shared File Directory Info.
    * Initial Requirement: `DRUPAL_THEME_PATH` variable.
    * Initial Requirement: `COMPONENT_LIBRARY_PATH` variable.
  * Initialize `.yo-rc.json` at Project Root.
  * Initialize Webpack and Dependencies. 
    * Handle Default Config + Custom Config
  * Initialize ESLINT
  * Initialize git (optional)

* `@phase2/generate-particle-drupal`: Yeoman Generator for Drupal Work. This is
responsible for:
  * Scaffold Drupal 8 Theme.
  * Resolve Root `.yo-rc.json`
  * Merge Webpack Configuration from `@phase2/particle-cli create`
  * Next Steps:
    * Integrate `generate:module-utilities` to scaffold theme helper modules
    * Requirement: `particle.config.json` holds `DRUPAL_MODULE_PATH` config. 

* `@phase2/generate-particle-component-library`: Yeomon Generator for Component
 Library. Responsible for:
   * Scaffold Pattern Lab Component Library
     * Investigate Utilizing Pattern Lab Node Starter Kit / Styleguide
     * Add Styleguide to `/templates`?
   * Resolve Root `.yo-rc.json`
   * Next Steps:
     * Integrate `generate:storybook` to scaffold Storybook CL.    

## Stage 2
* Create Reusable Code Library in `/templates`
  * Accessibility First Components

## Stage 3
* Upgrade Generators for Component Creators.
  * Create UI Components and Connectors.
* Upgrade `@phase2/particle-cli create`: for Gatsby project.
* Upgrade `@phase2/generate-particle-component-library` for Gatsby projects.

## Stage 4
* `@phase2/particle-ds`: Implement Documentation and Publish feature to have a 
web-hosted Design System.
* Optional. Integrate with Storybook / InVision DSM.

## Future API Commands
* `@phase2/particle-cli extract`: Extract Components.
* `@phase2/particle-cli publish`: Publish Components.

## Ideas
* Contributed / Default Components
  * Utilize `/templates` directory to include code starterkits + components.
