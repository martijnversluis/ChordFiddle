import Component from './component';

class ImportDialog extends Component {
  onImportConfirmed = () => {};

  setup() {
    this.onClick('confirmButton', () => {
      const editor = this.element('editor');
      const chordSheet = editor.value;
      editor.value = '';
      this.close();
      this.onImportConfirmed(chordSheet);
    });

    this.onClick('closeButton', () => this.close());
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
