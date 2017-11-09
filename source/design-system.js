/**
 * The kitchen sink of all design components
 */

// import breadcrumb from 'atoms/breadcrumb';
// import button from 'atoms/button';
// import image from 'atoms/image';
// import icon from 'atoms/icon';
// import listItem from 'atoms/list-item';
// import card from 'molecules/card';
// import jumbotron from 'molecules/jumbotron';

// Plain ol' object in ES6 object shorthand syntax
// const designSystem = {
//   breadcrumb,
//   button,
//   image,
//   icon,
//   listItem,
//   card,
//   jumbotron,
// };

// Provide each individually, allows for e.g.
// import { card } from './design-system';
// export { designSystem };

// Default export, allows for e.g.
// import designSystem from './design-system';
// export default designSystem;

import * as button from 'atoms/button';

export default {
  button,
};

