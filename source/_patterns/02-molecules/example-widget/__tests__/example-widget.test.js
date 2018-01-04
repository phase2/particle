import $ from 'jquery';

import { name } from '../';
import * as actions from '../src/actions';
import * as types from '../src/action-types';
import store from '../src/store';
import attach from '../src/';

import mockData from './mock-data.json';

beforeAll(() => {
  // Mock $.get() to avoid network calls during tests
  $.get = function mockGet() {
    // @TODO: Add `reject` to args in promise
    return new Promise((resolve) => {
      resolve(mockData);
    });
  };
});

test('component is registered', () => {
  expect(name).toBe('example-widget');
});

test('starts with default filter of `all`', () => {
  const { activeFilter } = store.getState();
  expect(activeFilter).toBe('ALL');
});

test('should create an action to set a filter', () => {
  const filter = 'xrp';
  const expectedAction = {
    type: types.SET_FILTER,
    filter,
  };
  expect(actions.setFilter(filter)).toEqual(expectedAction);
});

test('sets filter to string provided', () => {
  store.dispatch(actions.setFilter('ETH'));

  const { activeFilter } = store.getState();
  expect(activeFilter).toBe('ETH');
});

test('does not allow setting filter to unsupported filter', () => {
  store.dispatch(actions.setFilter('btc'));
  store.dispatch(actions.setFilter('blerp'));

  const { activeFilter } = store.getState();
  expect(activeFilter).not.toBe('blerp');
});

test('does not render if attachPoint is not in DOM', () => {
  document.body.innerHTML = '<div id="blerp"></div>';
  const $attachPoint = $('#attach', document);

  expect($attachPoint).toHaveLength(0);

  attach($attachPoint);

  const $found = $attachPoint.find('.example-widget');
  expect($found).toHaveLength(0);
});

test('renders if attachPoint is found in DOM', () => {
  document.body.innerHTML = '<div id="attach"></div>';
  const $attachPoint = $('#attach', document);

  expect($attachPoint).toHaveLength(1);

  attach($attachPoint);

  const $found = $attachPoint.find('.example-widget');
  expect($found).toHaveLength(1);
});
