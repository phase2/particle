import * as types from './action-types';

/*
 * Other constants
 */

// @TODO: Do we need allowed filters in state?

/*
 * Action creators
 */

export function setFilter(filter) {
  return { type: types.SET_FILTER, filter };
}

export function requestCrypto(crypto) {
  return {
    type: types.REQUEST_CRYPTO,
    crypto,
  };
}

export function requestCryptoSuccess(crypto, data) {
  return {
    type: types.REQUEST_CRYPTO_SUCCESS,
    data,
  };
}

export function fetchCryptos(crypto) {
  return dispatch => {
    dispatch(requestCrypto(crypto));

    return fetch('https://api.coinmarketcap.com/v1/ticker/?limit=10')
      .then(response => response.json())
      .then(cryptos => dispatch(requestCryptoSuccess(crypto, cryptos)))
      .then(() => dispatch(setFilter(crypto)));
  };
}

export default setFilter;
