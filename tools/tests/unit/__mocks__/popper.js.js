/**
 * Popper.js is required by Bootstrap and kersplodes Jest jsdoc.
 *
 * This mocks just enough to get basics to pass.
 */
import PopperJs from 'popper.js';

export default class Popper {
  // static placements = PopperJs.placements;
  constructor() {
    this.placements = PopperJs.placements;

    return {
      destroy: () => {},
      scheduleUpdate: () => {},
    };
  }
}
