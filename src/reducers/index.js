import { combineReducers } from 'redux';

import uiReducer from './ui_reducer';
import chordSheetReducer from './chord_sheet_reducer';

const rootReducer = combineReducers({
  ui: uiReducer,
  chordSheet: chordSheetReducer
});

export default rootReducer;
