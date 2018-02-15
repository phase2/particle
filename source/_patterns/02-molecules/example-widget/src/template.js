import $ from 'jquery';

import store from './store';
import { setFilter } from './actions';

function render() {
  const renderState = store.getState();
  // console.log(renderState);

  const dom = `
    <div class="example-widget card">
      <div class="card-header">Crypto</div>
      <div class="card-body">
        <h5 class="card-title">
          Filter: ${renderState.activeFilter} | Fetch: ${renderState.isFetching}
        </h5>
        <p>
          ${renderState.allFilters.map(optionFilter => `
            <a class="card-link ${optionFilter === renderState.activeFilter ? 'text-secondary' : ''}" href="#">
              ${optionFilter}
            </a>
          `).join('')}
        </p>
      </div>
      
      <ul class="list-group list-group-flush">
        ${renderState.filteredData.map(crypto => `
          <li class="list-group-item">${crypto.rank}. ${crypto.name} | $${crypto.price_usd} | ${crypto.symbol}</li>
        `).join('')}
      </ul>
    </div>
  `;

  // Make string a jQuery object
  const $dom = $(dom);

  // Attach events
  $dom.on('click', 'a', function filterClick() {
    store.dispatch(setFilter($(this).text().trim()));
  });

  return $dom;
}

export default render;
