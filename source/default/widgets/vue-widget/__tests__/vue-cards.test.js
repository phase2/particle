import { render, cleanup, fireEvent } from 'vue-testing-library';

import card from 'molecules/vue-widget/src/vue-cards/components/card.vue';
import cards from 'molecules/vue-widget/src/vue-cards/components/cards.vue';
import banner from 'molecules/vue-widget/src/vue-cards/components/banner.vue';

afterEach(cleanup);

describe('card.vue', () => {
  it('renders component with supplied props', () => {
    const props = {
      id: 77,
      name: 'waffles',
      phone: '555-555-5555',
      website: 'waffles.com',
      email: 'admin@waffles.com',
    };

    const { getByText } = render(card, { props });

    // getByText() fails test if text not found
    getByText('waffles');
    getByText('555-555-5555');
    getByText('waffles.com');
    getByText('admin@waffles.com');
  });

  it('initializes isClicked status as false', () => {
    const { getByText } = render(card);
    const clickStatus = getByText('clicked:', { exact: false });

    expect(clickStatus.textContent).toBe('clicked: false');
  });
});

describe('banner.vue', () => {
  it('shows the username passed in', () => {
    const props = {
      username: 'krieger',
    };

    const { getByText } = render(banner, { props });
    expect(getByText('krieger', { exact: false }).textContent).toContain(
      'krieger'
    );
  });

  it('changes color on click', async () => {
    const { getByTestId } = render(banner);
    const bannerElement = getByTestId('banner');

    expect(bannerElement.style['background-color']).toBe('rgb(0, 0, 0)');
    await fireEvent.click(bannerElement);
    expect(bannerElement.style['background-color']).not.toBe('rgb(0, 0, 0)');
  });
});

describe('cards.vue', () => {
  const CARDS_DATA = [
    {
      id: 77,
      name: 'waffles',
      phone: '555-555-5555',
      website: 'waffles.com',
      email: 'admin@waffles.com',
    },
    {
      id: 78,
      name: 'bacon',
      phone: '555-555-5556',
      website: 'bacon.com',
      email: 'admin@bacon.com',
    },
  ];

  it('renders component with supplied props', () => {
    const props = { cards: CARDS_DATA };
    const { getByText } = render(cards, { props });

    // getByText() fails test if text not found
    getByText('waffles');
    getByText('555-555-5555');
    getByText('waffles.com');
    getByText('admin@waffles.com');
  });

  it('displays the correct number of cards', () => {
    const props = { cards: CARDS_DATA };
    const { getAllByTestId } = render(cards, { props });

    expect(getAllByTestId('active-status')).toHaveLength(2);
  });
});
