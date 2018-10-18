/* eslint max-len: 0 */
module.exports = {
  verbose: true,
  testURL: 'http://localhost/',
  setupFiles: ['<rootDir>/tools/tests/unit/setupJest.js'],
  moduleNameMapper: {
    // Jest doesn't care about styles, twig, images, fonts, etc
    '\\.(twig|md|yml|yaml|css|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tools/tests/unit/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/jest-vue-preprocessor',
  },
};
