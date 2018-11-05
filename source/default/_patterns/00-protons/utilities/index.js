/**
 * JavaScript helper utilities used throughout Particle.
 */

/**
 * Generate a random number between 0 and 255
 * @returns {number}
 */
export const randRGB = () => Math.round(Math.random() * 255);

/**
 * Sass prints list output to CSS as comma separated strings w/ extra whitespace,
 *
 * @param {string} sassString - Sass list as string, i.e. ` foo, baz, bar, flerp`
 * @returns {Array}
 */
export const sass2Array = sassString =>
  sassString ? sassString.trim().split(', ') : [];

/**
 * Read CSS --variables off of :root and return as an object of var:value
 *
 * @returns {function(): void} - returns a function
 */
export const cssVars2Obj = () => {
  // Cache $root reference
  const $root = document.querySelector(':root');

  /**
   * Actual function used to query :root for CSS vars
   *
   * @param {Array} cssVars - array of CSS variables to turn into object
   * @returns {object}
   */
  return cssVars =>
    cssVars.reduce(
      (acc, cssVar) => ({
        ...acc,
        [cssVar]: getComputedStyle($root)
          .getPropertyValue(cssVar)
          .toString()
          .trim(),
      }),
      {}
    );
};

export default {};
