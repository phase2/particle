/**
 * This is the entry point of our widget. It doesn't know/care that it may be used in Drupal,
 * Grav, Pattern Lab, Wordpress, etc. It's just an app that needs a piece of DOM to which to attach.
 *
 * Note that it exports a simple interface and also prevents itself from running if the attach point
 * is not visible on the page.
 *
 * The widget uses Redux to manage state, and jQuery to make AJAX calls and HTML. A future iteration
 * of this widget should use combineReducers() from Redux to allow *all* widgets to share a single
 * state tree.
 */

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
  store.dispatch(fetchCryptos('ALL'));
}

export default attach;
