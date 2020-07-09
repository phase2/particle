"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const chalk_1 = require("chalk");
const storybookAddons = [
    '@storybook/addon-viewport',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
];
module.exports = class extends yeoman_generator_1.default {
    constructor() {
        super(...arguments);
        this.answers = {
            frontendFramework: 'react',
            npmInstall: false,
        };
    }
    async createStorybook() {
        const { frontendFramework } = this.answers;
        const dependencies = [`@storybook/${frontendFramework}`, ...storybookAddons];
        console.log(chalk_1.white('installing storybook dependencies'));
        try {
            await this.spawnCommandSync('echo', ['install', '-D', ...dependencies]);
        }
        catch (e) {
            console.log(chalk_1.red(`An error occured while calling npm install. 
           1. Perhaps npm is not installed correctly. Confirm by running npm --version`));
        }
        console.log(chalk_1.green('Success!'));
    }
};
//# sourceMappingURL=index.js.map