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
    const scssConfig = _.find(scssConfigs, item => !path.relative(item.src, scssPath));

    // Bail if there's no config
    if (!scssConfig) {
      console.warn('SCSS to Json config not found');
      return;
    }

    // Use sassExtract library to turn this Sass into an object we can parse
    sassExtract.render({
      file: scssPath,
    }).then((rendered) => {
      // Build our vars array
      const demoVars = _(rendered.vars.global)
        // Only grab vars that start with our config'd prefix string
        .pickBy((item, key) => key.startsWith(scssConfig.lineStartsWith))
        // Turn these key:objects into array of objects
        .map((item, key) => ({
          name: key,
          // @TODO: var resolution (sassExtract can help here)
          value: item.declarations[0].expression,
        }))
        // Filter out $var values. @TODO: revisit given sassExtract can resolve vars
        .filter(item => !scssConfig.allowVarValues && !item.value.startsWith('$'));

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
