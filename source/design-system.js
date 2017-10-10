import card from './_patterns/02-molecules/card/card';
// import button from './source/_patterns/01-molecules/button/button';
// import blerp from './source/_patterns/02-molecules/blerp/blerp';
import homepage from './_patterns/05-pages/homepage';


require('./scss/_config.scss');

const components = [];

components.push(card);
components.push(homepage);

export default components;

console.log('hello from design-system.js');
