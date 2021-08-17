import ChordSheetJS from 'chordsheetjs';
import { parse as parseChord } from 'chordjs';

const processChord = (item, processor) => {
  if (item instanceof ChordSheetJS.ChordLyricsPair && item.chords) {
    const parsedChord = parseChord(item.chords);

    if (parsedChord) {
      const processedChordLyricsPair = item.clone();
      processedChordLyricsPair.chords = processor(parsedChord).toString();
      return processedChordLyricsPair;
    }
  }

  return item;
};

const transformSong = (song, processor) => {
  const processedSong = song.clone();

  processedSong.lines = song.lines.map((line) => {
    const processedLine = line.clone();
    processedLine.items = line.items.map((item) => processChord(item, processor));
    return processedLine;
  });

  return processedSong;
};

const transformChordSheet = (chordSheet, processor) => {
  const song = new ChordSheetJS.ChordProParser().parse(chordSheet);
  const processedSong = transformSong(song, processor);
  return new ChordSheetJS.ChordProFormatter().format(processedSong);
};

export const transposeUp = (chordSheet) => (
  transformChordSheet(chordSheet, (chord) => chord.transposeUp())
);

export const transposeDown = (chordSheet) => (
  transformChordSheet(chordSheet, (chord) => chord.transposeDown())
);

export const switchToSharp = (chordSheet) => (
  transformChordSheet(chordSheet, (chord) => chord.useModifier('#'))
);

export const switchToFlat = (chordSheet) => (
  transformChordSheet(chordSheet, (chord) => chord.useModifier('b'))
);

export const convertChordSheetToChordPro = (chordSheet) => {
  const parser = new ChordSheetJS.ChordSheetParser({ preserveWhitespace: false });
  const formatter = new ChordSheetJS.ChordProFormatter();
  const song = parser.parse(chordSheet);
  return formatter.format(song);
};
