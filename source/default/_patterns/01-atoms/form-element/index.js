/**
 * form-element
 */

// eslint-disable-next-line
import $ from 'jquery';

// Module dependencies
import 'protons';

// Module template
import './_input.twig';
import './_select.twig';
import './_textarea.twig';

export const name = 'form-element';

export function disable() {}

// eslint-disable-next-line
export function enable($context) {}

export default enable;
