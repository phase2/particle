/**
 * Glob the Pattern Lab specific pieces we don't want to gunk up the design
 * system with
 */

// PL meta
import '../../source/_meta/_00-head.twig';
import '../../source/_meta/_01-foot.twig';

// Iterate on a context and require
function importAll(context) {
  context.keys().forEach(componentPath => {
    // console.log(componentPath);
    context(componentPath);
  });
}

// Watch all demo folders in source
importAll(require.context('../../source/_patterns', true, /demo$/));

// Watch all files in the source/_data folder
importAll(require.context('../../source/_data/', false, /\.(yml|json)$/));
