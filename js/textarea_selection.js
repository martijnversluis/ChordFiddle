export default class TextareaSelection {
  constructor(textarea) {
    this.textarea = textarea;
    this.hasSelectionRange = textarea.selectionStart !== textarea.selectionEnd;

    if (this.hasSelectionRange) {
      this.selectionStart = textarea.selectionStart;
      this.selectionEnd = textarea.selectionEnd;
    } else {
      this.selectionStart = 0;
      this.selectionEnd = textarea.value.length;
    }
  }

  replace(callback) {
    const currentValue = this.textarea.value;
    const selectedValue = currentValue.slice(this.selectionStart, this.selectionEnd);
    const prefix = currentValue.slice(0, this.selectionStart);
    const suffix = currentValue.slice(this.selectionEnd);
    const replacement = callback(selectedValue);

    this.textarea.value = prefix + replacement + suffix;
    this.textarea.focus();

    if (this.hasSelectionRange) {
      this.textarea.setSelectionRange(prefix.length, prefix.length + replacement.length);
    }
  }
}
