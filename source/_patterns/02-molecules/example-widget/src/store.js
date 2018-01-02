import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';

// Wire up our reducer to our state
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware),
);

export default store;
