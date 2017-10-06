const fs = require('fs');
const _ = require('lodash');

const scssToJsonOptions = [
  {
    src: './source/_patterns/00-base/05-colors/_colors.scss',
    dest: './source/_patterns/00-base/05-colors/colors.json',
    lineStartsWith: '$c-',
    allowVarValues: false,
  },
  {
    src: './source/_patterns/00-base/15-typography/fonts/_fonts.scss',
    dest: './source/_patterns/00-base/15-typography/fonts/font-sizes.json',
    lineStartsWith: '$fs--',
    allowVarValues: false,
  },
  {
    src: './source/_patterns/00-base/15-typography/fonts/_fonts.scss',
    dest: './source/_patterns/00-base/15-typography/fonts/font-families.json',
    lineStartsWith: '$ff--',
    allowVarValues: false,
  },
  {
    src: './source/_patterns/00-base/breakpoints/_breakpoints.scss',
    dest: './source/_patterns/00-base/breakpoints/breakpoints.json',
    lineStartsWith: '$bp--',
    allowVarValues: false,
  },
  {
    src: './source/_patterns/00-base/10-spacing/_spacing.scss',
    dest: './source/_patterns/00-base/10-spacing/spacing.json',
    lineStartsWith: '$spacing--',
    allowVarValues: false,
  },
];

// turns scss files full of variables into json files that PL can iterate on
function scssToJson(done) {
  scssToJsonOptions.forEach((pair) => {
    const scssVarList = _.filter(fs.readFileSync(pair.src, 'utf8').split('\n'), item => _.startsWith(item, pair.lineStartsWith));

    // console.log(scssVarList, item.src);

    let varsAndValues = _.map(scssVarList, (item) => {
      // assuming `item` is `$color-gray: hsl(0, 0%, 50%); // main gray color`
      const x = item.split(':');
      const y = x[1].split(';');
      return {
        name: x[0].trim(), // i.e. $color-gray
        value: y[0].replace(/!.*/, '').trim(), // i.e. hsl(0, 0%, 50%) after removing `!default`
        comment: y[1].replace('//', '').trim(), // any inline comment coming after, i.e. `// main gray color`
      };
    });

    if (!pair.allowVarValues) {
      varsAndValues = _.filter(varsAndValues, item => !_.startsWith(item.value, '$'));
    }

    fs.writeFileSync(pair.dest, JSON.stringify({
      items: varsAndValues,
      meta: {
        description: `To add to these items, use Sass variables that start with <code>${pair.lineStartsWith}</code> in <code>${pair.src}</code>`,
      },
    }, null, '  '));
  });
  done();
}

/**
 * Gulp task for converting sass variables to json for PL consumption.
 */
module.exports = {
  scssToJson: (gulp) => {
    gulp.task('scss-to-json', (done) => {
      scssToJson(() => {
        console.log('sass to json ran');
        done();
      });
    });
  },
  scssToJsonOptions,
};
