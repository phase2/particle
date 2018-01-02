import * as types from './action-types';

/*
 * Other constants
 */

// @TODO: Do we need allowed filters in state?

/*
 * Action creators
 */

export function setFilter(filter) {
  return { type: types.SET_FILTER, filter };
}

export default setFilter;
