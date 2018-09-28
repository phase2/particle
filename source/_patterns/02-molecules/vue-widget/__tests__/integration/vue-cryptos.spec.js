import { render, Simulate } from 'vue-testing-library';
import vueCryptos from 'molecules/vue-widget/src/vue-cryptos/facet-table.vue';
import facetTableRow from 'molecules/vue-widget/src/vue-cryptos/components/facet-table-row.vue';

describe('vue-cryptos.vue', () => {
  const { getByText } = render(vueCryptos);
  const filterElement = getByText('Filter:', { exact: false });

  it('renders the component title', () => {
    expect(getByText('Cryptos').textContent).toBe('Cryptos');
  });

  it('renders the default component filter', () => {
    expect(filterElement.textContent).toContain('all');
  });

  // This test seems to trigger `RangeError: Maximum call stack size exceeded`
  it('changes filter when a facet is clicked', () => {
    Simulate.click(getByText('winners'));
    expect(filterElement.textContent).toContain('winners');
  });
});

describe('facet-table-row.vue', () => {
  const props = {
    name: 'Bitcoin',
    symbol: 'BTC',
    rank: '1',
    price_usd: '15015.0',
    change: '1.11',
  };

  const { getByText } = render(facetTableRow, { props });

  it('renders row properties', () => {
    const nameElement = getByText('Bitcoin', { exact: false });
    expect(nameElement.textContent).toContain('Bitcoin');
  });
});
