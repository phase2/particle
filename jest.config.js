module.exports = {
  displayName: 'Particle CJS',
  verbose: true,
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'ts', 'json'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: true, // allows for type checking. Set to false only if you need to debug something quickly
      tsConfig: 'tsconfig.json',
    },
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
