import { createEditor } from '@chordbook/editor';
import { EditorSelection } from '@codemirror/state';
import { linter, setDiagnostics } from '@codemirror/lint';
import Component from './component';

class ChordSheetEditor extends Component {
  onChordSheetChange = () => {};

  setup() {
    this.editor = createEditor({
      doc: this.container.querySelector('*').innerText,
      parent: this.container,
      extensions: [
        linter(),
      ],
    });

    this.container.addEventListener('change', (e) => {
      this.onChordSheetChange(e.detail.doc);
    });
  }

  getSelectionRange() {
    const { from, to } = this.editor.state.selection.main;
    return [from, to];
  }

  setSelectionRange(selectionStart, selectionEnd) {
    this.editor.dispatch({
      selection: EditorSelection.create([
        EditorSelection.range(selectionStart, selectionEnd),
        EditorSelection.cursor(selectionEnd),
      ]),
    });
  }

  focus() {
    this.editor.focus();
  }

  getValue() {
    return this.editor.state.doc.toString();
  }

  setValue(value) {
    this.editor.dispatch({ changes: { from: 0, to: this.editor.state.doc.length, insert: value } });
  }

  setError(error) {
    this.element('errorMessage').innerText = error;
  }

  showError(message, location) {
    this.editor.dispatch(setDiagnostics(this.editor.state, [{
      from: location.start.offset,
      to: location.end.offset,
      severity: 'error',
      message,
    }]));
  }

  resetError() {
    this.editor.dispatch(setDiagnostics(this.editor.state, []));
  }

  transformChordSheet(transformationFunc) {
    const [selectionStart, selectionEnd] = this.getSelectionRange();
    const originalChordSheet = this.getValue();

    if (selectionStart === selectionEnd) {
      const newChordSheet = transformationFunc(originalChordSheet);
      const newCursorPosition = this.calculateNewCursorPosition(originalChordSheet, newChordSheet, selectionStart);
      this.setValue(newChordSheet);
      this.focus();
      this.setSelectionRange(newCursorPosition, newCursorPosition);
    } else {
      const selection = originalChordSheet.slice(selectionStart, selectionEnd);
      const prefix = originalChordSheet.slice(0, selectionStart);
      const suffix = originalChordSheet.slice(selectionEnd);
      const replacement = transformationFunc(selection);
      this.setValue([prefix, replacement, suffix].join(''));
      this.focus();
      this.setSelectionRange(selectionStart, selectionStart + replacement.length);
    }
  }

  calculateNewCursorPosition(originalChordSheet, newChordSheet, cursorPosition) {
    if (cursorPosition === 0) {
      return 0;
    }

    if (cursorPosition === originalChordSheet.length - 1) {
      return newChordSheet.length;
    }

    return cursorPosition;
  }
}

export default ChordSheetEditor;
