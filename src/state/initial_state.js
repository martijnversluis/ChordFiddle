import exampleChordProSheet from '../utils/example_chord_pro_sheet';
import { read as readLocationHash } from '../utils/location_hash';

export const getChordSheet = () => {
  const { chordSheet } = readLocationHash();
  return chordSheet || exampleChordProSheet;
};

export const getPreviewMode = () => {
  const { previewMode } = readLocationHash();
  return previewMode;
};
