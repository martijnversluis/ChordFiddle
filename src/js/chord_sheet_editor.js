import Component from './component';
import valueWithHistory from './value_with_history';
import debounce from './debounce';

class ChordSheetEditor extends Component {
  onChordSheetChange = () => {};

  errorLineNumber = valueWithHistory(null);

  setup() {
    this.container.addEventListener('input', debounce(() => {
      this.onChordSheetChange(this.getValue());
      this.updateLineNumbers();
    }));

    this.container.addEventListener('scroll', () => {
      this.lineNumbersContainer.scrollTop = this.container.scrollTop;
    });
  }

  get lineNumbersContainer() {
    return this.element('lineNumbers');
  }

  updateLineNumbers() {
    const lineNumbers = this.lineNumbersContainer.innerText.split('\n').filter((t) => t);
    const editorLineCount = this.getValue().split('\n').length;
    const previousErrorLine = this.errorLineNumber.valueWas;
    const newErrorLine = this.errorLineNumber.value;

    if (previousErrorLine) {
      lineNumbers[previousErrorLine - 1] = `${previousErrorLine}`;
    }

    if (newErrorLine) {
      lineNumbers[newErrorLine - 1] = `<div class="LineNumbers__error">${newErrorLine}</div>`;
    }

    if (lineNumbers.length > editorLineCount) {
      lineNumbers.splice(editorLineCount);
    }

    while (lineNumbers.length < editorLineCount) {
      lineNumbers.push(`${lineNumbers.length + 1}`);
    }

    this.lineNumbersContainer.innerHTML = lineNumbers.join('<br>');
  }

  getSelectionRange() {
    const { selectionStart, selectionEnd } = this.container;
    return [selectionStart, selectionEnd];
  }

  setSelectionRange(selectionStart, selectionEnd) {
    this.container.setSelectionRange(selectionStart, selectionEnd);
  }

  focus() {
    this.container.focus();
  }

  getValue() {
    return this.container.value;
  }

  setValue(value) {
    this.container.value = value;
    this.updateLineNumbers();
  }

  setError(error) {
    this.element('errorMessage').innerText = error;
  }

  showError(message, line) {
    this.setError(`Line ${line}: ${message}`);
    this.errorLineNumber.set(line);
  }

  resetError() {
    this.setError('');
    this.errorLineNumber.set(null);
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
