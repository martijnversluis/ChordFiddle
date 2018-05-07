import exampleChordProSheet from '../utils/example_chord_pro_sheet';
import { decompress } from '../utils/string_compression';
import getQueryParam from '../utils/get_query_param';
import {
  importChordSheet,
  switchToFlat,
  switchToSharp,
  transposeDown,
  transposeUp
} from '../utils/chord_sheet_transformations';

import {
  IMPORT_CHORD_SHEET,
  SET_CHORD_SHEET,
  SET_SELECTION_RANGE,
  SWITCH_TO_FLAT,
  SWITCH_TO_SHARP,
  TRANSPOSE_DOWN,
  TRANSPOSE_UP
} from '../action_types/chord_sheet_action_types';

const getTextRanges = (state) => {
  const { chordSheet } = state;
  let { selectionStart, selectionEnd } = state;

  if (selectionStart === selectionEnd) {
    selectionStart = 0;
    selectionEnd = chordSheet.length;
  }

  const selection = chordSheet.slice(selectionStart, selectionEnd);
  const prefix = chordSheet.slice(0, selectionStart);
  const suffix = chordSheet.slice(selectionEnd);

  return { selection, prefix, suffix };
};

const transformChordSheet = (state, processor) => {
  const { selectionStart, selectionEnd } = state;
  const { selection, prefix, suffix } = getTextRanges(state);
  const replacement = processor(selection);
  const chordSheet = prefix + replacement + suffix;

  if (selectionStart === selectionEnd) {
    return { ...state, chordSheet };
  } else {
    return {
      ...state,
      chordSheet,
      selectionStart: prefix.length,
      selectionEnd: prefix.length + replacement.length
    };
  }
};

const initialState = {
  selectionStart: 0,
  selectionEnd: 0,
  chordSheet: decompress(getQueryParam('chord_sheet', '')) || exampleChordProSheet,
};

const chordSheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTION_RANGE:
      const { start: selectionStart, end: selectionEnd } = action;
      return { ...state, selectionStart, selectionEnd };

    case SET_CHORD_SHEET:
      return { ...state, chordSheet: action.chordSheet };

    case IMPORT_CHORD_SHEET:
      return {
        ...state,
        chordSheet: importChordSheet(action.chordSheet),
        selectionStart: 0,
        selectionEnd: 0
      };

    case TRANSPOSE_UP:
      return transformChordSheet(state, transposeUp);

    case TRANSPOSE_DOWN:
      return transformChordSheet(state, transposeDown);

    case SWITCH_TO_SHARP:
      return transformChordSheet(state, switchToSharp);

    case SWITCH_TO_FLAT:
      return transformChordSheet(state, switchToFlat);

    default:
      return state;
  }
};

export default chordSheetReducer;
