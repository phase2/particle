/**
 * Navbar
 */

// Import dropdown js from bootstrap
import 'bootstrap/js/src/collapse';

// Custom
import 'protons';

// Module template
import './_navbar.twig';

// Import custom sass, includes Bootstrap sass
import './_navbar.scss';

export const name = 'navbar';

export function disable() {}

export function enable() {}

export default enable;
