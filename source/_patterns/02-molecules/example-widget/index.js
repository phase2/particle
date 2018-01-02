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

const filter = 'all';
const filters = ['all', 'eth', 'btc', 'xrp'];

const cardTemplate = () => `
  <div class="card">
    <div class="card-header">Crypto</div>
    <div class="card-body">
      <h5 class="card-title">Filter: ${filter}</h5>
      <p>Content here</p>
      ${filters.map(optionFilter => `<a class="card-link" href="#">${optionFilter}</button>`).join('')}
    </div>
  </div>
`;

export const name = 'example-widget';

export function disable() {}

export function enable($context) {
  $('#js-example-widget', $context).html(cardTemplate());
}

export default enable;
