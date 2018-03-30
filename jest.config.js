/* eslint max-len: 0 */
module.exports = {
  verbose: true,
  // If jest can't find a library in node_modules, include it here
  transformIgnorePatterns: [
    '!node_modules/bootstrap',
  ],
  moduleNameMapper: {
    // Jest doesn't care about styles, twig, images, fonts, etc
    '\\.(twig|md|yml|yaml|css|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>/tools/tests/unit/__mocks__/fileMock.js',

    // Webpack aliases. This is a pain, but Babel does NOT understand Webpack resolved aliases
    // @TODO: Look into helpers for this (e.g. https://github.com/mwolson/jest-webpack-alias)
    // Protons use a slightly different pattern because it's the only source pattern directory that
    // has a base-level index.js (this is how all components ensure access to base-level styles & variables).
    '^protons$': '<rootDir>/source/_patterns/00-protons/',
    '^atoms/(.+)': '<rootDir>/source/_patterns/01-atoms/$1',
    '^molecules/(.+)': '<rootDir>/source/_patterns/02-molecules/$1',
    '^organisms/(.+)': '<rootDir>/source/_patterns/03-organisms/$1',
    '^templates/(.+)': '<rootDir>/source/_patterns/04-templates/$1',
    '^pages/(.+)': '<rootDir>/source/_patterns/05-pages/$1',
  },
};
