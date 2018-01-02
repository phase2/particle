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

  // Immediately render
  $attachPoint.html(render());

  // Re-render and replace all HTML on every store change
  store.subscribe(() => $attachPoint.html(render()));
}

export default attach;
