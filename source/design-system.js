<<<<<<< HEAD
import vueComponents from './vue-app';
import card from './_patterns/02-molecules/card/card';
import homepage from './_patterns/05-pages/homepage';

require('./scss/_config.scss');
=======
/**
 * The kitchen sink of all design components
 */

import breadcrumb from 'atoms/breadcrumb';
import button from 'atoms/button';
import image from 'atoms/image';
import icon from 'atoms/icon';
import listItem from 'atoms/list-item';
import card from 'molecules/card';
import jumbotron from 'molecules/jumbotron';

// Plain ol' object in ES6 object shorthand syntax
const designSystem = {
  breadcrumb,
  button,
  image,
  icon,
  listItem,
  card,
  jumbotron,
};
>>>>>>> c1bcf4adfa84a744c109f4e749840301cc93c254

// Provide each individually, allows for e.g.
// import { card } from './design-system';
export { designSystem };

<<<<<<< HEAD
components.push(card);
components.push(homepage);

export { vueComponents };
export default components;

console.log('hello from design-system.js');
=======
// Default export, allows for e.g.
// import designSystem from './design-system';
export default designSystem;
>>>>>>> c1bcf4adfa84a744c109f4e749840301cc93c254
