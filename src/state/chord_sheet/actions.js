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

export const setSelectionRange = (start, end) => ({
  type: SET_SELECTION_RANGE,
  start,
  end,
});

export const setChordSheet = chordSheet => ({
  type: SET_CHORD_SHEET,
  chordSheet,
});

export const setImportableChordSheet = importableChordSheet => ({
  type: SET_IMPORTABLE_CHORD_SHEET,
  importableChordSheet,
});

export const importChordSheet = chordSheet => ({
  type: IMPORT_CHORD_SHEET,
  chordSheet,
});

export const transposeUp = () => ({
  type: TRANSPOSE_UP,
});

export const transposeDown = () => ({
  type: TRANSPOSE_DOWN,
});

export const switchToSharp = () => ({
  type: SWITCH_TO_SHARP,
});

export const switchToFlat = () => ({
  type: SWITCH_TO_FLAT,
});
