import {
  IMPORT_CHORD_SHEET,
  SET_CHORD_SHEET,
  SET_SELECTION_RANGE,
  SWITCH_TO_FLAT,
  SWITCH_TO_SHARP,
  TRANSPOSE_DOWN,
  TRANSPOSE_UP
} from '../action_types/chord_sheet_action_types';

export const setSelectionRange = ({start, end}) => {
  return {
    type: SET_SELECTION_RANGE,
    start,
    end,
  };
};

export const setChordSheet = (chordSheet) => {
  return {
    type: SET_CHORD_SHEET,
    chordSheet,
  };
};

export const importChordSheet = (chordSheet) => {
  return {
    type: IMPORT_CHORD_SHEET,
    chordSheet,
  };
};

export const transposeUp = () => {
  return {
    type: TRANSPOSE_UP,
  };
};

export const transposeDown = () => {
  return {
    type: TRANSPOSE_DOWN,
  };
};

export const switchToSharp = () => {
  return {
    type: SWITCH_TO_SHARP,
  };
};

export const switchToFlat = () => {
  return {
    type: SWITCH_TO_FLAT,
  };
};
