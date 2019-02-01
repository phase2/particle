/**
 * Accordion
 */

import 'bootstrap/js/dist/collapse';

// Module dependencies
import 'default_protons';
import 'default_atoms/button';
import 'default_molecules/card';

// Module template
import './_accordion.twig';

// Module styles
import './_accordion.scss';

export const name = 'accordion';

export function disable() {}

export function enable() {}

export default enable;
