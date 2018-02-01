/**
 * Example Vue widget
 *
 * An example of a testable, standalone, javascript-driven widget that makes an api call, writes
 * HTML, and does basic logic. This is a pretty naive re-render-on-data-change approach, using
 * poor-man's Redux and jQuery
 *
 * Note the use of this file (`vueWidget/index.js`) as the "implementation" of the actual
 * javascript application that resides in `vueWidget/App.vue`.
 */

// Module dependencies
import 'protons';
import Vue from 'vue';
import App from './src/App.vue';
import store from './src/store';

export const name = 'vueWidget';

export function disable() {}

export function enable() {
  new Vue({ // eslint-disable-line no-new
    el: '#app',
    store,
    render: h => h(App),
  });
}

export default enable;

