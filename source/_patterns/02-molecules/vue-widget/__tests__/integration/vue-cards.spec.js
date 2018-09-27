import { render } from 'vue-testing-library';
import card from '../../src/vue-cards/components/card.vue';
import cards from '../../src/vue-cards/components/cards.vue';
import banner from '../../src/vue-cards/components/banner.vue';

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
    expect(getByText('waffles').textContent).toContain('waffles');
    expect(getByText('555-555-5555').textContent).toBe('555-555-5555');
    expect(getByText('waffles.com').textContent).toBe('waffles.com');
    expect(getByText('admin@waffles.com').textContent).toContain('admin');
  });

  it('initializes isClicked status as false', () => {
    const { getByText } = render(card);
    const clickStatus = getByText('clicked:', { exact: false });

    expect(clickStatus.textContent).toBe('clicked: false');
  });

  it('changes active status if isClicked is true', () => {
    const props = { isClicked: true };
    const { getByText, getByTestId } = render(card, { props });
    const clickStatus = getByText('clicked:', { exact: false });

    expect(clickStatus.textContent).toBe('clicked: true');
    expect(getByTestId('active-status').className).toBe('active');
  });
});

// TODO: troubleshoot error caused by banner.vue import
describe('banner.vue', () => {
  it('renders component with supplied props', () => {
    const props = {
      username: 'krieger',
    };

    const { getByText } = render(banner, { props });
    expect(getByText('krieger', { exact: false }).textContent).toContain(
      'krieger'
    );
  });
});

describe('cards.vue', () => {
  it('renders component with supplied props', () => {
    const props = {
      cards: [
        {
          id: 77,
          name: 'waffles',
          phone: '555-555-5555',
          website: 'waffles.com',
          email: 'admin@waffles.com',
        },
      ],
    };

    const { getByText } = render(cards, { props });
    expect(getByText('waffles').textContent).toContain('waffles');
    expect(getByText('555-555-5555').textContent).toBe('555-555-5555');
    expect(getByText('waffles.com').textContent).toBe('waffles.com');
    expect(getByText('admin@waffles.com').textContent).toContain('admin');
  });
});
