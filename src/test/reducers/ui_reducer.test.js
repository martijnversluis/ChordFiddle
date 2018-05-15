import expect from 'expect';

import uiReducer from '../../state/ui/reducer';
import { HIDE_IMPORT_DIALOG, SET_PREVIEW_MODE, SHOW_IMPORT_DIALOG } from '../../state/ui/constants';
import { IMPORT_CHORD_SHEET } from '../../state/chord_sheet/constants';

describe('uiReducer', () => {
  it('sets the preview mode', () => {
    const previousState = { previewMode: 'foo' };

    const action = {
      type: SET_PREVIEW_MODE,
      previewMode: 'bar',
    };

    const newState = uiReducer(previousState, action);

    expect(newState.previewMode).toEqual('bar');
  });

  it('sets the import dialog visibility to visible', () => {
    const previousState = { showImportDialog: false };
    const action = { type: SHOW_IMPORT_DIALOG };
    const newState = uiReducer(previousState, action);

    expect(newState.showImportDialog).toBe(true);
  });

  it('sets the import dialog visibility to hidden', () => {
    const previousState = { showImportDialog: true };
    const action = { type: HIDE_IMPORT_DIALOG };
    const newState = uiReducer(previousState, action);

    expect(newState.showImportDialog).toBe(false);
  });

  it('hides the import dialog on import', () => {
    const previousState = { showImportDialog: true };
    const action = { type: IMPORT_CHORD_SHEET };
    const newState = uiReducer(previousState, action);

    expect(newState.showImportDialog).toBe(false);
  });

  it('returns the previous state when receiving an unknown action', () => {
    const previousState = { foo: 'bar' };
    const action = { type: 'FOOBAR' };
    const newState = uiReducer(previousState, action);

    expect(newState).toBe(previousState);
  });
});