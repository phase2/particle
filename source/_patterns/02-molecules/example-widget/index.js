/**
 * Example JS widget
 *
 * An example of a testable, standalone, javascript-driven widget that makes an api call, writes
 * HTML, and does basic logic. This is a pretty naive re-render-on-data-change approach, using
 * poor-man's Redux and jQuery
 */
import $ from 'jquery';

import 'protons';
import 'molecules/card';

import './_example-widget.scss';

import createStore from './lib/redux-lite';
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

// Wire up our reducer to our state
const store = createStore(widget, initialState);

// Rendered, event-bound DOM returned
function render() {
  const renderState = store.getState();
  console.log(renderState);

  const dom = `
    <div class="example-widget card">
      <div class="card-header">Crypto</div>
      <div class="card-body">
        <h5 class="card-title">Filter: ${renderState.activeFilter}</h5>
        <p>Content here</p>
        ${renderState.allFilters.map(optionFilter => `
          <a class="card-link ${optionFilter === renderState.activeFilter ? 'text-secondary' : ''}" href="#">
            ${optionFilter}
          </a>
        `).join('')}
      </div>
    </div>
  `;

  // Make string a jQuery object
  const $dom = $(dom);

  // Attach events
  $dom.on('click', 'a', function filterClick() {
    store.dispatch({
      type: 'SET_FILTER',
      filter: $(this).text().trim(),
    });
  });

  return $dom;
}

export const name = 'example-widget';

export function disable() {}

export function enable($context) {
  const $attachPoint = $('#js-example-widget', $context);
  store.subscribe(() => $attachPoint.html(render()));

  // We must dispatch since actions will have already fired before enable()
  store.dispatch({});
}

export default enable;
