module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        target: { node: 12 },
      },
    ],
    '@babel/preset-typescript',
  ],
  env: {
    test: {
      presets: [['@babel/preset-env']],
    },
    production: {
      plugins: ['transform-remove-console'],
    },
  },
}
