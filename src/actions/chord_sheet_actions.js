import { SET_SELECTION_RANGE } from '../action_types/chord_sheet_action_types';

export const setSelectionRange = ({start, end}) => ({ type: SET_SELECTION_RANGE, payload: { start, end } });
