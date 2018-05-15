import { applyMiddleware, compose, createStore } from 'redux';

import rootReducer from './reducers';
import synchronizeLocationHash from './middleware/synchronize_location_hash';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,

  composeEnhancers(
    applyMiddleware(synchronizeLocationHash),
  ),
);

export default store;
