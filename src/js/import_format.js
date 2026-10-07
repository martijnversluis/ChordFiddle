import {
  ChordProFormatter,
  ChordProParser,
  ChordsOverWordsParser,
  UltimateGuitarParser,
} from 'chordsheetjs';

const PARSER_BY_FORMAT = {
  chordpro: ChordProParser,
  'chords-over-words': ChordsOverWordsParser,
  'ultimate-guitar': UltimateGuitarParser,
};

export const getImportFormatOptions = () => [
  { label: 'Ultimate Guitar', value: 'ultimate-guitar' },
  { label: 'Chords over Words', value: 'chords-over-words' },
];

export const getParserForFormat = (format = 'ultimate-guitar') => (
  PARSER_BY_FORMAT[format] || PARSER_BY_FORMAT['ultimate-guitar']
);

export const convertImportedChordSheetToChordPro = (chordSheet, format = 'ultimate-guitar') => {
  const Parser = getParserForFormat(format);

  const parser = Parser === ChordsOverWordsParser
    ? new Parser({ preserveWhitespace: false })
    : new Parser();

  const song = parser.parse(chordSheet);
  return new ChordProFormatter().format(song);
};
