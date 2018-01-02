import { name } from '../';
import store from '../src/store';
import * as actions from '../src/actions';
import * as types from '../src/action-types';

test('component is registered', () => {
  expect(name).toBe('example-widget');
});

test('should create an action to set a filter', () => {
  const filter = 'xrp';
  const expectedAction = {
    type: types.SET_FILTER,
    filter,
  };
  expect(actions.setFilter(filter)).toEqual(expectedAction);
});

test('starts with default filter of `all`', () => {
  const { activeFilter } = store.getState();
  expect(activeFilter).toBe('all');
});

test('sets filter to string provided', () => {
  store.dispatch(actions.setFilter('eth'));

  const { activeFilter } = store.getState();
  expect(activeFilter).toBe('eth');
});

test('does not allow setting filter to unsupported filter', () => {
  store.dispatch(actions.setFilter('btc'));
  store.dispatch(actions.setFilter('blerp'));

  const { activeFilter } = store.getState();
  expect(activeFilter).not.toBe('blerp');
});
