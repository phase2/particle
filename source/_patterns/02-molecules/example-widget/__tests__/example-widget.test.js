import $ from 'jquery';

import { name } from '../';
import * as actions from '../src/actions';
import * as types from '../src/action-types';
import store from '../src/store';
import attach from '../src/';

import mockData from './mock-data';

beforeAll(() => {
  // Mock $.get() to avoid network calls during tests
  $.get = function mockGet(url) {
    return new Promise((resolve, reject) => {
      resolve(mockData);
    })
  }
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

  expect($attachPoint.length).toBe(0);

  attach($attachPoint);

  const $found = $attachPoint.find('.example-widget');
  expect($found.length).toBe(0);
});

test('renders if attachPoint is found in DOM', () => {
  document.body.innerHTML = '<div id="attach"></div>';
  const $attachPoint = $('#attach', document);

  expect($attachPoint.length).toBe(1);

  attach($attachPoint);

  const $found = $attachPoint.find('.example-widget');
  expect($found.length).toBe(1);
});
