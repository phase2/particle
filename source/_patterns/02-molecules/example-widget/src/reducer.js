import * as types from './action-types';

const initialState = {
  activeFilter: 'ALL',
  allFilters: ['ALL', 'ETH', 'BTC', 'XRP'],
  isFetching: false,
  filteredData: [],
  data: [],
};

const widget = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FILTER:
      // Only set filter to allowed values
      if (!state.allFilters.includes(action.filter)) {
        return state;
      }

      if (action.filter === 'ALL') {
        return {
          ...state,
          activeFilter: action.filter,
          filteredData: [...state.data],
        };
      }

      return {
        ...state,
        activeFilter: action.filter,
        filteredData: state.data.filter(crypto => action.filter === crypto.symbol),
      };
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
