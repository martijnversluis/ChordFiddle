import { getQueryParams, setQueryParams } from './query_param';
import { compress, decompress } from './string_compression';

const getChordSheet = (queryParams) => {
  const { chord_sheet: chordSheet } = queryParams;

  if (chordSheet) {
    return decompress(chordSheet);
  }

  return null;
};

const getPreviewMode = (queryParams) => {
  const { preview: previewMode } = queryParams;
  return previewMode;
};

export const read = () => {
  const queryParams = getQueryParams();
  const chordSheet = getChordSheet(queryParams);
  const previewMode = getPreviewMode(queryParams);

  return { chordSheet, previewMode };
};

export const write = ({ chordSheet, previewMode }) => {
  setQueryParams({
    chord_sheet: compress(chordSheet),
    preview: previewMode,
  });
};
