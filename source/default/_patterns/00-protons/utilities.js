// Generate a random number between 0 and 255
export const randRGB = () => Math.round(Math.random() * 255);

// Generate media queries for breakpointing.
export const mediaBreakpoint = {
  down: breakpoint => `screen and (max-width: ${breakpoint})`,
  up: breakpoint => `screen and (min-width: ${breakpoint})`,
};

export default {};
