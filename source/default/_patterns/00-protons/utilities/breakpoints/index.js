/**
 * Breakpoints Sass -> DOM
 */

import $ from 'jquery';
import enquire from 'enquire.js';

import 'protons'; // Guarantees :root CSS variables referenced below

import './_breakpoints.scss'; // Custom, e.g. --breakpoints: xs, sm, md, lg, xl;

// Generate media queries for breakpointing.
export const mediaBreakpoint = {
  down: breakpoint => `screen and (max-width: ${breakpoint})`,
  up: breakpoint => `screen and (min-width: ${breakpoint})`,
};

const $root = $(':root');
const bpList = $root.css('--breakpoints');

// Map the breakpoints to the Sass variables also stored in :root
export const breakpoints = bpList
  ? bpList
      // Remove whitespace
      .replace(/ /g, '')
      // Split on comma
      .split(',')
      // Starting with an empty object (second arg to .reduce()), return a new
      // object that spreads the prior keys into it plus our new key + value
      .reduce(
        (bps, bp) => ({
          ...bps,
          [bp]: $root.css(`--breakpoint-${bp}`),
        }),
        {}
      )
  : {};

/**
 * Provide enquire functions to run at specified breakpoints.
 *
 * This simply feeds to the enquire.register() library, which looks like:
 *
 * enquire.register('screen and (max-width: 992px), {
 *   match: () => {
 *      console.log('Screen is above Large sized.');
 *   },
 *   unmatch: () => {
 *     console.log('Screen is below Large sized.');
 *   },
 * });
 *
 * @example
 * register(
 *   'up',
 *   'lg',
 *   () => alert('matched lg!'),
 *   () => alert('unmatched lg!')
 * );
 *
 * @param {('up'|'down')} dir - Direction of `mediaBreakpoint`
 * @param {string} bp - Breakpoint name from Sass, e.g. xs, sm, md, lg, xl
 * @param {function} match - Function to run when the media query matches
 * @param {function} unmatch - Function to run when the media query umatches
 */
export const register = (dir, bp, match, unmatch) => {
  const mq = mediaBreakpoint[dir](breakpoints[bp]);
  enquire.register(mq, { match, unmatch });
};

export default register;
