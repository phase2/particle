import * as types from './action-types';

const initialState = {
  activeFilter: 'all',
  allFilters: ['all', 'eth', 'btc', 'xrp'],
  isFetching: false,
  data: [],
};

const widget = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FILTER:
      // Only set filter to allowed values
      return state.allFilters.includes(action.filter)
        ? { ...state, activeFilter: action.filter }
        : state;
    case types.REQUEST_CRYPTO:
      return {
        ...state,
        isFetching: true,
      };
    case types.REQUEST_CRYPTO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    default:
      return state;
  }
};

export default widget;
