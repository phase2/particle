"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const chalk_1 = require("chalk");
const index_1 = require("../../../../common/index");
const baseDependencies = [1, 2, 3];
module.exports = class extends yeoman_generator_1.default {
    constructor() {
        super(...arguments);
        this.answers = {
            projectName: 'hello-world',
            componentLibraryName: 'particle',
            componentLibraryPath: './src/default',
            options: {
                cssLibrary: index_1.CSSLibraryOptions.TAILWIND,
                componentLibraryTypes: [index_1.ComponentLibraryOptions.STORYBOOK],
                frontendFramework: [index_1.FrontendFrameworkOptions.REACT],
                hasSVG: true,
                hasTypescript: true,
                testingLibraries: [index_1.TestingLibraryOptions.JEST],
                typescriptEsm: false,
            },
        };
    }
    async createPackageJson() {
        const { frontendFramework } = this.answers.options;
        console.log(this.answers);
        console.log(chalk_1.white('running npm init'));
        const dependencies = [`@storybook/${frontendFramework}`];
        console.log(chalk_1.white('installing storybook dependencies'));
        try {
            await this.spawnCommandSync('echo', ['install', '-D', ...dependencies]);
        }
        catch (e) {
            console.log(chalk_1.red(`An error occured while calling npm install. 
           1. Perhaps npm is not installed correctly. Confirm by running npm --version`));
        }
        console.log(chalk_1.green('Success! Again!'));
    }
};
//# sourceMappingURL=index.js.map