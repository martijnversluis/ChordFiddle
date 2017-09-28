import ChordSheetJS from 'chordsheetjs';
import Chord from 'chordjs';
import Textarea from './textarea';

export default class ChordFiddle {
  constructor({editor, previewer = null}) {
    this.editor = editor;
    this.previewer = previewer;

    if (this.previewer) {
      this.editor.addEventListener('input', this.onEditorChange.bind(this));

      if (this.editor.value.length) {
        this.onEditorChange();
      }
    }
  }

  onEditorChange() {
    const song = this.parseChordProSheet();
    const formatter = new ChordSheetJS.TextFormatter();
    const chordSheet = formatter.format(song);
    this.previewer.value = chordSheet;
  }

  parseChordProSheet() {
    const parser = new ChordSheetJS.ChordProParser();
    return parser.parse(this.editor.value);
  }

  transitChords(processor) {
    (new Textarea(this.editor)).replaceSelectedText(selection => {
      const song = new ChordSheetJS.ChordProParser().parse(selection);

      song.lines.forEach(line => {
        line.items.forEach(item => {
          this.processChord(item, processor);
        });
      });

      const transposedSong = new ChordSheetJS.ChordProFormatter().format(song);
      return transposedSong;
    });

    this.onEditorChange();
  }

  processChord(item, processor) {
    if (item instanceof ChordSheetJS.ChordLyricsPair && item.chords) {
      const parsedChord = Chord.parse(item.chords);
      item.chords = processor(parsedChord).toString();
    }
  }

  transposeUp() {
    this.transitChords(chord => chord.transposeUp());
  }

  transposeDown() {
    this.transitChords(chord => chord.transposeDown());
  }

  switchToSharp() {
    this.transitChords(chord => chord.useModifier('#'));
  }

  switchToFlat() {
    this.transitChords(chord => chord.useModifier('b'));
  }
}
