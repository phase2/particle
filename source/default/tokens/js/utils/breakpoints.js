/**
 * Breakpoints Sass -> DOM
 */

import enquire from 'enquire.js';

import 'protons'; // Guarantees :root CSS variables referenced below

import { sass2Array, cssVars2Obj } from '.';

// Sass tokens contain our :root { --breakpoints: xs, sm, md, lg }
import '../../sass/tokens.scss';

// Constants of design system
const BP_VAR_NAME = '--breakpoints';
const BP_PREFIX = '--breakpoint-';
const replacePrefix = new RegExp(BP_PREFIX, 'g');
// Prepare a cssVarReader (calls to :root, caches reference)
const cssVarReader = cssVars2Obj();

// Generate media queries for breakpointing.
export const mediaBreakpoint = {
  down: breakpoint => `screen and (max-width: ${breakpoint})`,
  up: breakpoint => `screen and (min-width: ${breakpoint})`,
};

// Get the string value of the --breakpoints list (first value in object)
// i.e. " xs, sm, md, lg, xl"
const bpListString = cssVarReader([BP_VAR_NAME])[BP_VAR_NAME];
// Transform string to array, i.e. ['xs', 'sm', 'md', 'lg', 'xl']
const bpListArray = sass2Array(bpListString).map(bp => `${BP_PREFIX}${bp}`);

/**
 * Breakpoint object that looks like:
 * {
 *   xs: "0",
 *   sm: "576px",
 *   md: "768px",
 *   lg: "992px",
 *   xl: "1200px"
 * }
 * Requires changing keys from e.g. '--breakpoint-sm' to 'sm'
 */
export const breakpoints = Object.entries(cssVarReader(bpListArray)).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [key.replace(replacePrefix, '')]: value,
  }),
  {}
);

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
