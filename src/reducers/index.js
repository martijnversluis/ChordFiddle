import { combineReducers } from 'redux';

import uiReducer from './ui_reducer';

const rootReducer = combineReducers({
  ui: uiReducer
});

export default rootReducer;
