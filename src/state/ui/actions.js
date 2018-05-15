import { HIDE_IMPORT_DIALOG, SET_PREVIEW_MODE, SHOW_IMPORT_DIALOG } from './constants';

export const showImportDialog = () => ({
  type: SHOW_IMPORT_DIALOG,
});

export const hideImportDialog = () => ({
  type: HIDE_IMPORT_DIALOG,
});

export const setPreviewMode = previewMode => ({
  type: SET_PREVIEW_MODE,
  previewMode,
});
