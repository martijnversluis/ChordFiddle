import ChordSheetJS from 'chordsheetjs';
import Chord from 'chordjs';

const processChord = (item, processor) => {
  if (item instanceof ChordSheetJS.ChordLyricsPair && item.chords) {
    const parsedChord = Chord.parse(item.chords);

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
    processedLine.items = line.items.map(item => processChord(item, processor));
    return processedLine;
  });

  return processedSong;
};

const transformChordSheet = (chordSheet, processor) => {
  const song = new ChordSheetJS.ChordProParser().parse(chordSheet);
  const processedSong = transformSong(song, processor);
  return new ChordSheetJS.ChordProFormatter().format(processedSong);
};

export const transposeUp = (chordSheet) => {
  return transformChordSheet(chordSheet, chord => chord.transposeUp());
};

export const transposeDown = (chordSheet) => {
  return transformChordSheet(chordSheet, chord => chord.transposeDown());
};

export const switchToSharp = (chordSheet) => {
  return transformChordSheet(chordSheet, chord => chord.useModifier('#'));
};

export const switchToFlat = (chordSheet) => {
  return transformChordSheet(chordSheet, chord => chord.useModifier('b'));
};
