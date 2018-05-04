import { SET_PREVIEW_MODE } from '../action_types/ui_action_types';

const initialState = {
  previewMode: 'html',
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PREVIEW_MODE:
      return { ...state, previewMode: action.payload };

    default:
      return state;
  }
};

export default uiReducer;
