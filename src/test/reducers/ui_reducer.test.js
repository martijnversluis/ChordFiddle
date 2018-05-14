import expect from 'expect';

import uiReducer from '../../reducers/ui_reducer';
import { HIDE_IMPORT_DIALOG, SET_PREVIEW_MODE, SHOW_IMPORT_DIALOG } from '../../action_types/ui_action_types';

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
});
