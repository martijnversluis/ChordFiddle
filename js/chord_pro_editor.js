import ChordSheetJS from 'chordsheetjs';
import Chord from 'chordjs';
import TextareaSelection from './textarea_selection';

export default class ChordFiddle {
  constructor({editor, textPreviewer = null, htmlPreviewer = null}) {
    this.editor = editor;
    this.textPreviewer = textPreviewer;
    this.htmlPreviewer = htmlPreviewer;

    this.editor.addEventListener('input', this.onEditorChange.bind(this));

    if (this.editor.value.length) {
      this.onEditorChange();
    }
  }

  importChordSheet(chordSheet) {
    const song = new ChordSheetJS.ChordSheetParser().parse(chordSheet);
    this.editor.value = new ChordSheetJS.ChordProFormatter().format(song);
    this.onEditorChange();
  }

  onEditorChange() {
    const song = this.parseChordProSheet();

    if (this.textPreviewer) {
      this.textPreviewer.value = new ChordSheetJS.TextFormatter().format(song);
    }

    if (this.htmlPreviewer) {
      this.htmlPreviewer.innerHTML = new ChordSheetJS.HtmlFormatter().format(song);
    }
  }

  parseChordProSheet() {
    const parser = new ChordSheetJS.ChordProParser();
    return parser.parse(this.editor.value);
  }

  transitChords(processor) {
    (new TextareaSelection(this.editor)).replace(selection => {
      const song = new ChordSheetJS.ChordProParser().parse(selection);
      this.transitSong(song, processor);
      const transposedSong = new ChordSheetJS.ChordProFormatter().format(song);
      return transposedSong;
    });

    this.onEditorChange();
  }

  transitSong(song, processor) {
    song.lines.forEach(line => {
      line.items.forEach(item => {
        this.processChord(item, processor);
      });
    });
  }

  processChord(item, processor) {
    if (item instanceof ChordSheetJS.ChordLyricsPair && item.chords) {
      const parsedChord = Chord.parse(item.chords);

      if (parsedChord) {
        item.chords = processor(parsedChord).toString();
      }
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
