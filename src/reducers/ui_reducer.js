import { HIDE_IMPORT_DIALOG, SET_PREVIEW_MODE, SHOW_IMPORT_DIALOG } from '../action_types/ui_action_types';

const initialState = {
  previewMode: 'html',
  showImportDialog: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PREVIEW_MODE:
      return { ...state, previewMode: action.payload };

    case SHOW_IMPORT_DIALOG:
      return { ...state, showImportDialog: true };

    case HIDE_IMPORT_DIALOG:
      return { ...state, showImportDialog: false };

    default:
      return state;
  }
};

export default uiReducer;
