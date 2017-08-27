import ChordSheetJS from 'chordsheetjs';

export default class ChordFiddle {
  constructor(node) {
    this.chordProEditor = node.querySelector('[data-id="chordProEditor"]');
    this.chordSheetTextViewer = node.querySelector('[data-id="chordSheetTextViewer"]');
    this.chordProEditor.addEventListener('input', this.onChordProEditorChange.bind(this));
  }

  onChordProEditorChange() {
    const parser = new ChordSheetJS.ChordProParser();
    const song = parser.parse(this.chordProEditor.value);
    const formatter = new ChordSheetJS.TextFormatter();
    const chordSheet = formatter.format(song);
    this.chordSheetTextViewer.value = chordSheet;
  }
}
