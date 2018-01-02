/**
 * Example JS widget
 *
 * An example of a testable, standalone, javascript-driven widget that makes an api call, writes
 *  HTML, and does basic logic
 */
import $ from 'jquery';

import 'protons';
import 'molecules/card';

import './_example-widget.scss';

import { SET_FILTER, REQUEST_DATA, RECEIVE_DATA } from './actionTypes';

const initialState = {
  activeFilter: 'all',
  allFilters: ['all', 'eth', 'btc', 'xrp'],
  requestingData: false,
  data: [],
};

const widget = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return Object.assign({}, state, {
        activeFilter: action.filter,
      });
    case REQUEST_DATA:
      return Object.assign({}, state, {
        requestingData: true,
      });
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        requestingData: false,
        data: action.data,
      });
    default:
      return state;
  }
};

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    // Return optional function to unsub
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};

const store = createStore(widget, initialState);

// // Row of filter links
// const filtersTemplate = () => (
//   filters.map(optionFilter => `
//     <a class="card-link ${optionFilter === activeFilter ? 'text-secondary' : ''}" href="#">
//       ${optionFilter}
//     </a>
//   `).join('')
// );
// // Overall card template
// const cardTemplate = () => `
//   <div class="example-widget card">
//     <div class="card-header">Crypto</div>
//     <div class="card-body">
//       <h5 class="card-title">Filter: ${activeFilter}</h5>
//       <p>Content here</p>
//       ${filtersTemplate()}
//     </div>
//   </div>
// `;

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: 'SET_FILTER',
  filter: 'eth',
});

export const name = 'example-widget';

export function disable() {}

export function enable($context) {
  $('#js-example-widget', $context).html('blerp');
}

export default enable;
