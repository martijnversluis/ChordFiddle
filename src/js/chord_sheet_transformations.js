import {
  ChordProFormatter,
  ChordProParser,
  ChordSheetParser,
} from 'chordsheetjs';

const transformChordSheet = (chordSheet, processor) => {
  const song = new ChordProParser().parse(chordSheet);
  const processedSong = processor(song);
  return new ChordProFormatter().format(processedSong);
};

export const transposeUp = (chordSheet) => (
  transformChordSheet(chordSheet, (song) => song.transposeUp())
);

export const transposeDown = (chordSheet) => (
  transformChordSheet(chordSheet, (song) => song.transposeDown())
);

export const switchToSharp = (chordSheet) => (
  transformChordSheet(chordSheet, (song) => song.useModifier('#'))
);

export const switchToFlat = (chordSheet) => (
  transformChordSheet(chordSheet, (song) => song.useModifier('b'))
);

export const convertChordSheetToChordPro = (chordSheet) => {
  const parser = new ChordSheetParser({ preserveWhitespace: false });
  const formatter = new ChordProFormatter();
  const song = parser.parse(chordSheet);
  return formatter.format(song);
};
