import { HIDE_IMPORT_DIALOG, SET_PREVIEW_MODE, SHOW_IMPORT_DIALOG } from './constants';
import getQueryParam from '../../utils/get_query_param';
import { IMPORT_CHORD_SHEET } from '../chord_sheet/constants';

const initialState = {
  previewMode: getQueryParam('preview', 'html'),
  showImportDialog: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PREVIEW_MODE:
      return {
        ...state,
        previewMode: action.previewMode,
      };

    case SHOW_IMPORT_DIALOG:
      return {
        ...state,
        showImportDialog: true,
      };

    case HIDE_IMPORT_DIALOG:
      return {
        ...state,
        showImportDialog: false,
      };

    case IMPORT_CHORD_SHEET:
      return {
        ...state,
        showImportDialog: false,
      };

    default:
      return state;
  }
};

export default uiReducer;
