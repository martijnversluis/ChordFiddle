import { HIDE_IMPORT_DIALOG, SET_PREVIEW_MODE, SHOW_IMPORT_DIALOG } from '../action_types/ui_action_types';

export const showImportDialog = () => {
  return {
    type: SHOW_IMPORT_DIALOG,
  };
};

export const hideImportDialog = () => {
  return {
    type: HIDE_IMPORT_DIALOG,
  };
};

export const setPreviewMode = (previewMode) => {
  return {
    type: SET_PREVIEW_MODE,
    previewMode,
  };
};
