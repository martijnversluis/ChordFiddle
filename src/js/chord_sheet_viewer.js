import chordsheetjs from 'chordsheetjs';
import Component from './component';

const formatters = {
  html: chordsheetjs.HtmlTableFormatter,
  text: chordsheetjs.TextFormatter,
};

class ChordSheetViewer extends Component {
  onDisplayModeChanged = () => {};

  setup() {
    this.onChange('displayModeHtml', () => this.displayModeChanged());
    this.onChange('displayModeText', () => this.displayModeChanged());
  }

  displayModeChanged() {
    const displayMode = this.getSelectedMode();
    this.onDisplayModeChanged(displayMode);
  }

  render(song) {
    const displayMode = this.getSelectedMode();
    const outlet = this.element('outlet');
    outlet.dataset.mode = displayMode;

    const formatter = new formatters[displayMode]();
    const formattedSheet = formatter.format(song);

    switch (displayMode) {
      case 'text':
        outlet.innerText = formattedSheet;
        break;
      default:
        outlet.innerHTML = formattedSheet;
    }
  }

  getDisplayModeRadios() {
    const element = this.element('displayModeHtml');
    return Array.from(element.form[element.name]);
  }

  getSelectedMode() {
    return this
      .getDisplayModeRadios()
      .find((input) => input.checked)
      .value;
  }

  setSelectedMode(mode) {
    this
      .getDisplayModeRadios()
      .find((input) => input.value === mode)
      .checked = true;
  }
}

export default ChordSheetViewer;
