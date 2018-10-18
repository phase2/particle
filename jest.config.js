module.exports = {
  verbose: true,
  testURL: 'http://localhost/',
  setupFiles: ['<rootDir>/tools/tests/unit/setupJest.js'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    // Jest doesn't care about styles, twig, images, fonts, etc
    '\\.(twig|md|yml|yaml|css|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tools/tests/unit/__mocks__/fileMock.js',

    // Webpack aliases. This is a pain, but Babel does NOT understand Webpack resolved aliases
    // @TODO: Look into helpers for this (e.g. https://github.com/mwolson/jest-webpack-alias)
    '^protons[/]?(.*)': '<rootDir>/source/default/_patterns/00-protons/$1',
    '^atoms[/]?(.*)': '<rootDir>/source/default/_patterns/01-atoms/$1',
    '^molecules[/]?(.*)': '<rootDir>/source/default/_patterns/02-molecules/$1',
    '^organisms[/]?(.*)': '<rootDir>/source/default/_patterns/03-organisms/$1',
    '^templates[/]?(.*)': '<rootDir>/source/default/_patterns/04-templates/$1',
    '^pages[/]?(.*)': '<rootDir>/source/default/_patterns/05-pages/$1',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
  },
};
