module.exports = {
  projects: ['<rootDir>/source/*/jest.config.js'],

  // Everything below here is used by merging into per-design-system jest config
  verbose: true,
  testURL: 'http://localhost/',
  setupFiles: ['<rootDir>/tools/tests/unit/setupJest.js'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper: {
    // Jest doesn't care about styles, twig, images, fonts, etc
    '\\.(twig|md|yml|yaml|css|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tools/tests/unit/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
  },
};
