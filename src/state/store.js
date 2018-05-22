import { applyMiddleware, compose, createStore } from 'redux';

import rootReducer from './reducers';
import synchronizeLocationHash from './middleware/synchronize_location_hash';
import { getChordSheet } from './initial_state';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const chordSheet = {
  selectionStart: 0,
  selectionEnd: 0,
  chordSheet: getChordSheet(),
};

const initialState = {
  chordSheet,
};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(synchronizeLocationHash),
  ),
);

export default store;
