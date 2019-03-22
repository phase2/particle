module.exports = {
  presets: [
    [
      '@babel/preset-env',
      // @TODO: Do we need useBuiltIns?
      // {
      //   useBuiltIns: 'entry',
      //   corejs: 2,
      // },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
  ],
  env: {
    test: {
      presets: [['@babel/preset-env']],
    },
  },
};
