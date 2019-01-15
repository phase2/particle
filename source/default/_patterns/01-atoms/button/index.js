/**
 * Button
 */

import $ from 'jquery';
import 'bootstrap/js/dist/button';

// Custom
import 'protons';
import ParticleElement from '../../../_types/particle-element.ts';

// Module template
import './_button.twig';
import './_button-outline.twig';
import './_button-dropdown.twig';
import './_button-dropdown-split.twig';

// Import custom sass, includes Bootstrap sass
import './_button.scss';

const Element = new ParticleElement('button');
Element.enable = $context => $('#blah', $context).button('toggle');
export default Element;
