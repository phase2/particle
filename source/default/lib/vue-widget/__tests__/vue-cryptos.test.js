import { render, cleanup, fireEvent } from 'vue-testing-library';
import FacetTable from '../src/vue-cryptos/facet-table.vue';
import FacetTableRow from '../src/vue-cryptos/components/facet-table-row.vue';
import mockData from './mock-data.json';

afterEach(cleanup);

describe('vue-cryptos.vue', () => {
  fetch.mockResponse(JSON.stringify(mockData));

  it('renders the component title', () => {
    const { getByText } = render(FacetTable);
    expect(getByText('Cryptos')).toBeTruthy();
  });

  it('renders the default component filter', () => {
    const { getByText } = render(FacetTable);
    const filterElement = getByText('Filter:', { exact: false });
    expect(filterElement.textContent).toContain('all');
  });

  it('facet button becomes active on click and unselected buttons remain nonactive', async () => {
    const { getByTestId } = render(FacetTable);

    const winnersButton = getByTestId('facet-button-winners');
    const allButton = getByTestId('facet-button-all');
    const losersButton = getByTestId('facet-button-losers');

    await fireEvent.click(winnersButton);

    expect(winnersButton.className).toBe(
      'btn btn-secondary text-uppercase active'
    );
    expect(allButton.className).toBe('btn btn-secondary text-uppercase');
    expect(losersButton.className).toBe('btn btn-secondary text-uppercase');
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

  it('renders name property', () => {
    const { getByText } = render(FacetTableRow, { props });
    const nameElement = getByText('Bitcoin', { exact: false });

    expect(nameElement.textContent).toContain('Bitcoin');
  });

  it('renders price property', () => {
    const { getByText } = render(FacetTableRow, { props });
    const priceElement = getByText('15015', { exact: false });

    expect(priceElement.textContent).toContain('15015');
  });

  it('renders symbol property', () => {
    const { getByText } = render(FacetTableRow, { props });
    const symbolElement = getByText('BTC', { exact: false });

    expect(symbolElement.textContent).toContain('BTC');
  });
});
