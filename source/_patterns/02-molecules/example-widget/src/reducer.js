import { RECEIVE_DATA, REQUEST_DATA, SET_FILTER } from './action-types';

const initialState = {
  activeFilter: 'all',
  allFilters: ['all', 'eth', 'btc', 'xrp'],
  requestingData: false,
  data: [],
};

const widget = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        activeFilter: action.filter,
      };
    case REQUEST_DATA:
      return {
        ...state,
        requestingData: true,
      };
    case RECEIVE_DATA:
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
