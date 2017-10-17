import vueComponents from './vue-app';
import card from './_patterns/02-molecules/card/card';
import homepage from './_patterns/05-pages/homepage';

require('./scss/_config.scss');

const components = [];

components.push(card);
components.push(homepage);

export { vueComponents };
export default components;

console.log('hello from design-system.js');
