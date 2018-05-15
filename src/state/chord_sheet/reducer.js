import * as chordSheetTransformations from '../../utils/chord_sheet_transformations';
import { getChordSheet } from '../initial_state';

import {
  IMPORT_CHORD_SHEET,
  SET_CHORD_SHEET,
  SET_IMPORTABLE_CHORD_SHEET,
  SET_SELECTION_RANGE,
  SWITCH_TO_FLAT,
  SWITCH_TO_SHARP,
  TRANSPOSE_DOWN,
  TRANSPOSE_UP,
} from './constants';

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
  }

  return {
    ...state,
    chordSheet,
    selectionStart: prefix.length,
    selectionEnd: prefix.length + replacement.length,
  };
};

const setSelectionRange = (state, action) => ({
  ...state,
  selectionStart: action.start,
  selectionEnd: action.end,
});

const setChordSheet = (state, action) => ({
  ...state,
  chordSheet: action.chordSheet,
});

const setImportableChordSheet = (state, action) => ({
  ...state,
  importableChordSheet: action.importableChordSheet,
});

const importChordSheet = (state, converter) => ({
  ...state,
  chordSheet: converter(state.importableChordSheet),
  selectionStart: 0,
  selectionEnd: 0,
});

const initialState = {
  selectionStart: 0,
  selectionEnd: 0,
  chordSheet: getChordSheet(),
};

export const createChordSheetReducer = (chordSheetTransforms) => {
  const { convertChordSheetToChordPro, switchToFlat, switchToSharp, transposeDown, transposeUp } = chordSheetTransforms;

  return (state = initialState, action) => {
    switch (action.type) {
      case SET_SELECTION_RANGE:
        return setSelectionRange(state, action);

      case SET_CHORD_SHEET:
        return setChordSheet(state, action);

      case SET_IMPORTABLE_CHORD_SHEET:
        return setImportableChordSheet(state, action);

      case IMPORT_CHORD_SHEET:
        return importChordSheet(state, convertChordSheetToChordPro);

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
};

export default createChordSheetReducer(chordSheetTransformations);
