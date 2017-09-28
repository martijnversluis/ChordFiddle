export default class Textarea {
  constructor(textarea) {
    this.textarea = textarea;
  }

  replaceSelectedText(callback) {
    const currentValue = this.textarea.value;
    let selectionStart = this.textarea.selectionStart;
    let selectionEnd = this.textarea.selectionEnd;
    const hasSelection = (selectionStart != selectionEnd);

    if (!hasSelection) {
      selectionStart = 0;
      selectionEnd = this.textarea.value.length;
    }

    const selectedValue = currentValue.slice(selectionStart, selectionEnd);
    const prefix = currentValue.slice(0, selectionStart);
    const suffix = currentValue.slice(selectionEnd);
    const replacement = callback(selectedValue);
    this.textarea.value = prefix + replacement + suffix;
    this.textarea.focus();

    if (hasSelection) {
      this.textarea.setSelectionRange(prefix.length, prefix.length + replacement.length);
    }
  }
}
