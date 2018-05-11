import expect from 'expect';

import { hideImportDialog, setPreviewMode, showImportDialog } from '../../actions/ui_actions';
import uiReducer from '../../reducers/ui_reducer';

describe('uiReducer', () => {
  it('sets the preview mode', () => {
    const previousState = { previewMode: 'foo' };
    const action = setPreviewMode('bar');
    const newState = uiReducer(previousState, action);

    expect(newState.previewMode).toEqual('bar');
  });

  it('sets the import dialog visibility to visible', () => {
    const previousState = { showImportDialog: false };
    const action = showImportDialog();
    const newState = uiReducer(previousState, action);

    expect(newState.showImportDialog).toBe(true);
  });

  it('sets the import dialog visibility to hidden', () => {
    const previousState = { showImportDialog: true };
    const action = hideImportDialog();
    const newState = uiReducer(previousState, action);

    expect(newState.showImportDialog).toBe(false);
  });
});
