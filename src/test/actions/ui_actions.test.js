import expect from 'expect';

import { HIDE_IMPORT_DIALOG, SET_PREVIEW_MODE, SHOW_IMPORT_DIALOG } from '../../action_types/ui_action_types';
import { hideImportDialog, setPreviewMode, showImportDialog } from '../../actions/ui_actions';

describe('ui actions', () => {
  it('generates an action for showing the import dialog', () => {
    const expectedAction = { type: SHOW_IMPORT_DIALOG };
    expect(showImportDialog()).toEqual(expectedAction);
  });

  it('generates an action for hiding the import dialog', () => {
    const expectedAction = { type: HIDE_IMPORT_DIALOG };
    expect(hideImportDialog()).toEqual(expectedAction);
  });

  it('generates an action for setting the preview mode', () => {
    const expectedAction = {
      type: SET_PREVIEW_MODE,
      previewMode: 'foobar'
    };

    expect(setPreviewMode('foobar')).toEqual(expectedAction);
  });
});
