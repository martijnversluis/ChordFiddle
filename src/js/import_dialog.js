import Component from './component';
import { getImportFormatOptions } from './import_format';

class ImportDialog extends Component {
  onImportConfirmed = () => {};

  setup() {
    this.populateFormatOptions();

    this.onClick('confirmButton', () => {
      const editor = this.element('editor');
      const format = this.element('format').value;
      const chordSheet = editor.value;
      editor.value = '';
      this.close();
      this.onImportConfirmed(chordSheet, format);
    });

    this.onClick('closeButton', () => this.close());
  }

  populateFormatOptions() {
    const select = this.element('format');

    select.innerHTML = getImportFormatOptions()
      .map(({ label, value }) => `<option value="${value}">${label}</option>`)
      .join('');

    select.value = 'ultimate-guitar';
  }

  setOpen(open) {
    this.container.classList.toggle('ImportDialog--visible', open);
  }

  open() {
    this.setOpen(true);
    this.element('editor').focus();
  }

  close() {
    this.setOpen(false);
  }
}

export default ImportDialog;
