import { combineReducers } from 'redux';

import uiReducer from './ui/reducer';
import chordSheetReducer from './chord_sheet/reducer';

const rootReducer = combineReducers({
  ui: uiReducer,
  chordSheet: chordSheetReducer,
});

export default rootReducer;
