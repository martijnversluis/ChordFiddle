import expect from 'expect';

import chordSheetReducer, { createChordSheetReducer } from '../../reducers/chord_sheet_reducer';

import {
  IMPORT_CHORD_SHEET,
  SET_CHORD_SHEET,
  SET_IMPORTABLE_CHORD_SHEET,
  SET_SELECTION_RANGE,
  SWITCH_TO_FLAT,
  SWITCH_TO_SHARP,
  TRANSPOSE_DOWN,
  TRANSPOSE_UP,
} from '../../action_types/chord_sheet_action_types';

describe('ChordSheetReducer', () => {
  it('sets the selection range', () => {
    const previousState = {
      selectionStart: 5,
      selectionEnd: 10,
    };

    const action = {
      type: SET_SELECTION_RANGE,
      start: 20,
      end: 30,
    };

    const newState = chordSheetReducer(previousState, action);

    expect(newState.selectionStart).toEqual(20);
    expect(newState.selectionEnd).toEqual(30);
  });

  it('sets the chord sheet', () => {
    const previousState = { chordSheet: 'foo' };

    const action = {
      type: SET_CHORD_SHEET,
      chordSheet: 'bar',
    };

    const newState = chordSheetReducer(previousState, action);

    expect(newState.chordSheet).toEqual('bar');
  });

  it('sets the importable chord sheet', () => {
    const previousState = { importableChordSheet: 'foo' };

    const action = {
      type: SET_IMPORTABLE_CHORD_SHEET,
      importableChordSheet: 'bar',
    };

    const newState = chordSheetReducer(previousState, action);

    expect(newState.importableChordSheet).toEqual('bar');
  });

  it('imports a chord sheet', () => {
    const stubbedTransformations = {
      convertChordSheetToChordPro(chordSheet) {
        return `${chordSheet.substr(3)}${chordSheet.substr(0, 3)}`;
      },
    };

    const reducer = createChordSheetReducer(stubbedTransformations);

    const previousState = {
      chordSheet: 'something',
      importableChordSheet: 'foobar',
    };

    const action = { type: IMPORT_CHORD_SHEET };
    const newState = reducer(previousState, action);

    expect(newState.chordSheet).toEqual('barfoo');
  });

  it('transposes a chord sheet up', () => {
    const stubbedTransformations = {
      transposeUp(chordSheet) {
        return `up ${chordSheet.substr(3)}${chordSheet.substr(0, 3)}`;
      },
    };

    const reducer = createChordSheetReducer(stubbedTransformations);
    const previousState = { chordSheet: 'foobar' };
    const action = { type: TRANSPOSE_UP };
    const newState = reducer(previousState, action);

    expect(newState.chordSheet).toEqual('up barfoo');
  });

  it('transposes a chord sheet down', () => {
    const stubbedTransformations = {
      transposeDown(chordSheet) {
        return `down ${chordSheet.substr(3)}${chordSheet.substr(0, 3)}`;
      },
    };

    const reducer = createChordSheetReducer(stubbedTransformations);
    const previousState = { chordSheet: 'foobar' };
    const action = { type: TRANSPOSE_DOWN };
    const newState = reducer(previousState, action);

    expect(newState.chordSheet).toEqual('down barfoo');
  });

  it('changes the chord sheet to have sharp chords', () => {
    const stubbedTransformations = {
      switchToSharp(chordSheet) {
        return `sharp ${chordSheet.substr(3)}${chordSheet.substr(0, 3)}`;
      },
    };

    const reducer = createChordSheetReducer(stubbedTransformations);
    const previousState = { chordSheet: 'foobar' };
    const action = { type: SWITCH_TO_SHARP };
    const newState = reducer(previousState, action);

    expect(newState.chordSheet).toEqual('sharp barfoo');
  });

  it('changes the chord sheet to have flat chords', () => {
    const stubbedTransformations = {
      switchToFlat(chordSheet) {
        return `flat ${chordSheet.substr(3)}${chordSheet.substr(0, 3)}`;
      },
    };

    const reducer = createChordSheetReducer(stubbedTransformations);
    const previousState = { chordSheet: 'foobar' };
    const action = { type: SWITCH_TO_FLAT };
    const newState = reducer(previousState, action);

    expect(newState.chordSheet).toEqual('flat barfoo');
  });
});
