import { render, Simulate } from 'vue-testing-library';
import vueCryptos from '../src/vue-cryptos/facet-table.vue';
import facetTableRow from '../src/vue-cryptos/components/facet-table-row.vue';
import mockData from './mock-data.json';

describe('vue-cryptos.vue', () => {
  fetch.mockResponse(JSON.stringify(mockData));
  const { getByText } = render(vueCryptos);
  const filterElement = getByText('Filter:', { exact: false });

  it('renders the component title', () => {
    expect(getByText('Cryptos').textContent).toBe('Cryptos');
  });

  it('renders the default component filter', () => {
    expect(filterElement.textContent).toContain('all');
  });

  it('button becomes active on click and unselected buttons remain nonactive', () => {
    const getBtns = () => document.querySelectorAll('.btn');
    let allBtns = getBtns();
    expect(allBtns[0].className).toBe(
      'btn btn-secondary text-uppercase active'
    );
    Simulate.click(allBtns[1]);
    allBtns = getBtns();
    expect(allBtns[0].className).toBe('btn btn-secondary text-uppercase');
    expect(allBtns[1].className).toBe(
      'btn btn-secondary text-uppercase active'
    );
  });
});

describe('facet-table-row.vue', () => {
  const props = {
    name: 'Bitcoin',
    symbol: 'BTC',
    rank: 1,
    price_usd: 15015.0,
    change: 1.11,
  };

  const { getByText } = render(facetTableRow, { props });

  it('renders name property', () => {
    const nameElement = getByText('Bitcoin', { exact: false });
    expect(nameElement.textContent).toContain('Bitcoin');
  });

  it('renders price property', () => {
    const priceElement = getByText('15015', { exact: false });
    expect(priceElement.textContent).toContain('15015');
  });

  it('renders symbol property', () => {
    const symbolElement = getByText('BTC', { exact: false });
    expect(symbolElement.textContent).toContain('BTC');
  });
});
