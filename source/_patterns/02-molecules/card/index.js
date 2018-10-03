/**
 * Card
 */

// Module dependencies
import 'protons';
import 'atoms/image';
import 'atoms/button';

// Module template
import './_card.twig';

// Module styles
import './_card.scss';

export const name = 'card';

export function disable() {}

export function enable() {
  console.log('hello from card');
}

export default enable;
