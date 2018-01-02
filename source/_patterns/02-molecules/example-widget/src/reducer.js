import * as types from './action-types';

const initialState = {
  activeFilter: 'all',
  allFilters: ['all', 'eth', 'btc', 'xrp'],
  requestingData: false,
  data: [],
};

const widget = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FILTER:
      // Only set filter to allowed values
      return state.allFilters.includes(action.filter)
        ? {
          ...state,
          activeFilter: action.filter,
        }
        : state;
    case types.REQUEST_DATA:
      return {
        ...state,
        requestingData: true,
      };
    case types.RECEIVE_DATA:
      return {
        ...state,
        requestingData: false,
        data: action.data,
      };
    default:
      return state;
  }
};

export default widget;
