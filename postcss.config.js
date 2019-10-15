module.exports = {
  plugins: {
    // Uses .browserslistrc to figure out which prefixes to add. CSS Grid has
    // special considerations:
    //   https://github.com/postcss/autoprefixer#does-autoprefixer-polyfill-grid-layout-for-ie
    'postcss-preset-env': { autoprefixer: { grid: true } },
  },
};
