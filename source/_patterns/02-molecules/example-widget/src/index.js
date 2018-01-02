import $ from 'jquery';

import store from './store';
import render from './template';

function attach(attachPoint) {
  // Make absolutely sure attachPoint is jQuery object
  const $attachPoint = $(attachPoint);

  // Bail if our attach point is not on screen
  if (!$attachPoint.length) {
    return;
  }

  // Re-render and replace all HTML on every data change
  store.subscribe(() => $attachPoint.html(render()));
  // Dispatch an empty action to trigger a render after subscribing
  store.dispatch({});
}

export default attach;
