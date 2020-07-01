#!/usr/bin/env node

import fs from "fs";

const base = {
  extends: [
    "airbnb-base",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier"],
  root: true,
  rules: {
    "no-console": "warn",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
};

export const template = `
/**
 * Use AirBnB ES6 linting standards, as well as a Jest plugin for tests
 *
 * Rule reference: http://eslint.org/docs/rules
 * Individual rule reference: http://eslint.org/docs/rules/NAME-OF-RULE
 */
module.exports = ${JSON.stringify(base, null, 2)}
`;

export const callback = (err: Error) => {
  if (err) throw err;
  console.log("The file has been saved!");
};

export const buildConfig = (config: any): void => {
  fs.writeFile(".eslintrc.js", template, "utf8", callback);
};
