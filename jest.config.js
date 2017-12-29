module.exports = {
  verbose: true,
  // If jest can't find a library in node_modules, include it here
  transformIgnorePatterns: [
    '!node_modules/bootstrap'
  ],
  moduleNameMapper: {
    // Jest doesn't care about styles, images, fonts, etc
    '\\.(css|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>/tools/tests/unit/__mocks__/fileMock.js',
    // Webpack aliases. @TODO: pull in webpack.shared.config.js and pull this piece off?
    '^protons$': '<rootDir>/source/_patterns/00-protons/',
    '^atoms$': '<rootDir>/source/_patterns/01-atoms/',
    '^molecules$': '<rootDir>/source/_patterns/02-molecules/',
    '^organisms$': '<rootDir>/source/_patterns/03-organisms/',
    '^templates$': '<rootDir>/source/_patterns/04-templates/',
    '^pages$': '<rootDir>/source/_patterns/05-pages/'
  },
};
