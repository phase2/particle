import createStore from '../lib/redux-lite';

import reducer from './reducer';

// Wire up our reducer to our state
const store = createStore(reducer);

export default store;
