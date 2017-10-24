import card from './_patterns/02-molecules/card/card';
import homepage from './_patterns/05-pages/homepage';
import button from './_patterns/01-atoms/button';

require('./scss/_config.scss');

const components = [];

components.push(card);
components.push(homepage);
components.push(button);

export default components;

console.log('hello from design-system.js');
