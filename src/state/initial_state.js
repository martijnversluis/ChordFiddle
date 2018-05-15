import exampleChordProSheet from '../utils/example_chord_pro_sheet';
import { decompress } from '../utils/string_compression';
import { getQueryParams } from '../utils/query_param';

export const getChordSheet = () => {
  const { chord_sheet: chordSheet } = getQueryParams();
  return decompress(chordSheet || '') || exampleChordProSheet;
};

export const getPreviewMode = () => {
  const { preview: previewMode } = getQueryParams();
  return previewMode;
};
