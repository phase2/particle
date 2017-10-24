import card from './_patterns/02-molecules/card/card';
import homepage from './_patterns/05-pages/homepage';
import primary_button from './_patterns/01-atoms/buttons/primary/primary';

require('./scss/_config.scss');

const components = [];

components.push(card);
components.push(homepage);
components.push(primary_button);

export default components;

console.log('hello from design-system.js');
