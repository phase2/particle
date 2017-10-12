const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const sassExtract = require('sass-extract');

/**
 * Turns scss files full of variables into json files that PL can iterate on
 * @param scssConfigs
 * @returns {function(*=)}
 */
module.exports = function scssToJson(scssConfigs) {
  return (scssPath) => {
    // Find the object in our scssConfigs where the paths match, ie relative
    // path will be empty string (which with flip to true)
    const scssConfig = _.find(scssConfigs, item => !path.relative(item.src, scssPath) );

    // Bail if there's no config
    if (!scssConfig) {
      console.warn('SCSS to Json config not found');
      return;
    }

    // Use sassExtract library to turn this Sass into an object we can parse
    sassExtract.render({
      file: scssPath
    }).then(rendered => {
      // Build our vars array
      const demoVars = _(rendered.vars.global)
        // Only grab vars that start with our config'd prefix string
        .pickBy((item, key) => {
          return key.startsWith(scssConfig.lineStartsWith);
        })
        // Turn these key:objects into array of objects
        .map((item, key) => {
          return {
            name: key,
            value: item.declarations[0].expression // @TODO: var resolution (sassExtract can help here)
          };
        });

      // Write it out to json in the format our twig files expect
      fs.writeFileSync(scssConfig.dest, JSON.stringify({
        items: demoVars,
        meta: {
          description: `To add to these items, use Sass variables that start with <code>${scssConfig.lineStartsWith}</code> in <code>${scssConfig.src}</code>`,
        },
      }, null, '  '));

    });
  };
};

// @TODO: remove once we verify we have feature parity
// turns scss files full of variables into json files that PL can iterate on
// module.exports = function scssToJson(scssConfigs) {
//
//   return (done) => {
//     // console.log(arguments);
//
//     scssConfigs.forEach((pair) => {
//       const scssVarList = _.filter(fs.readFileSync(pair.src, 'utf8').split('\n'), item => _.startsWith(item, pair.lineStartsWith));
//
//       let varsAndValues = _.map(scssVarList, (item) => {
//         // assuming `item` is `$color-gray: hsl(0, 0%, 50%); // main gray color`
//         const x = item.split(':');
//         const y = x[1].split(';');
//         return {
//           name: x[0].trim(), // i.e. $color-gray
//           value: y[0].replace(/!.*/, '').trim(), // i.e. hsl(0, 0%, 50%) after removing `!default`
//           comment: y[1].replace('//', '').trim(), // any inline comment coming after, i.e. `// main gray color`
//         };
//       });
//
//       if (!pair.allowVarValues) {
//         varsAndValues = _.filter(varsAndValues, item => !_.startsWith(item.value, '$'));
//       }
//
//       fs.writeFileSync(pair.dest, JSON.stringify({
//         items: varsAndValues,
//         meta: {
//           description: `To add to these items, use Sass variables that start with <code>${pair.lineStartsWith}</code> in <code>${pair.src}</code>`,
//         },
//       }, null, '  '));
//     });
//     done();
//   };
// };
