import { SET_SELECTION_RANGE } from '../action_types/chord_sheet_action_types';

const initialState = {
  selectionStart: 0,
  selectionEnd: 0
};

const chordSheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTION_RANGE:
      const { start: selectionStart, end: selectionEnd } = action.payload;
      return { ...state, selectionStart, selectionEnd };

    default:
      return state;
  }
};

export default chordSheetReducer;
