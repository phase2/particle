module.exports = {
  presets: [['@babel/preset-env', { useBuiltIns: 'entry' }]],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
  ],
};
