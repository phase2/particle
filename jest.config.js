module.exports = {
  verbose: true,
  testURL: 'http://localhost/',
  setupFiles: ['<rootDir>/tools/tests/unit/setupJest.js'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    // Jest doesn't care about styles, twig, images, fonts, etc
    '\\.(twig|md|yml|yaml|css|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tools/tests/unit/__mocks__/fileMock.js',
    '^protons[/]?(.*)': '<rootDir>/source/_patterns/00-protons/$1',
    '^atoms/(.+)': '<rootDir>/source/_patterns/01-atoms/$1',
    '^molecules/(.+)': '<rootDir>/source/_patterns/02-molecules/$1',
    '^organisms/(.+)': '<rootDir>/source/_patterns/03-organisms/$1',
    '^templates/(.+)': '<rootDir>/source/_patterns/04-templates/$1',
    '^pages/(.+)': '<rootDir>/source/_patterns/05-pages/$1',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
  },
};
