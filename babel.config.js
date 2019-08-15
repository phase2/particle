module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
  ],
  env: {
    test: {
      presets: [['@babel/preset-env']],
    },
  },
};
