/**
 * Glob the Pattern Lab specific pieces we don't want to gunk up the design
 * system with
 */

import importAll from '../../tools/webpack/import-all';

// PL meta
import './pattern-lab/_meta/_00-head.twig';
import './pattern-lab/_meta/_01-foot.twig';

// Watch all demo folders in source
const demoSystem = importAll(
  require.context('./pattern-lab/_patterns', true, /index\.js$/)
);
// Watch all files in the source/_data folder
importAll(require.context('./pattern-lab/_data/', false, /\.(yml|json)$/));

export default demoSystem;
