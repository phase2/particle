import $ from 'jquery';

import store from './store';
import render from './template';
import { fetchCryptos } from './actions';

function attach(attachPoint) {
  // Make absolutely sure attachPoint is jQuery object
  const $attachPoint = $(attachPoint);

  // Bail if our attach point is not on screen
  if (!$attachPoint.length) {
    return;
  }

  // Immediately render
  $attachPoint.html(render());

  // Re-render and replace all HTML on every store change
  store.subscribe(() => $attachPoint.html(render()));

  // Immediate kick-off of request
  store.dispatch(fetchCryptos('all'));
}

export default attach;
