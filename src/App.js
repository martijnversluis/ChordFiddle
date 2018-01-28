import React, { Component } from 'react';
import ChordSheetJS from 'chordsheetjs';
import Chord from 'chordjs';
import Header from './Header';
import Toolbar from './Toolbar';

const EXAMPLE_CHORD_PRO_SHEET =
`{title: Let it be}
{subtitle: ChordSheetJS example version}
{Chorus}

Let it [Am]be, let it [C/G]be, let it [F]be, let it [C]be
[C]Whisper words of [G]wisdom, let it [F]be [C/E] [Dm] [C]`;

class App extends Component {
  constructor() {
    super();

    this.state = {
      chordSheet: EXAMPLE_CHORD_PRO_SHEET,
      textPreview: '',
      htmlPreview: '',
      htmlPreviewActive: false,
      selectionStart: 0,
      selectionEnd: 0,
      importChordSheetModalVisible: false
    };
  }

  adjustSelection() {
    const {selectionStart, selectionEnd} = this.state;
    this.chordSheetEditor.focus();
    this.chordSheetEditor.setSelectionRange(selectionStart, selectionEnd);
  }

  render() {
    return (
      <div className="App-container">
        <Header/>

        <main>
          <div className="columns">
            <section className="column column-left">
              <Toolbar
                onTransposeDown={this.transposeDown}
                onTransposeUp={this.transposeUp}
                onSwitchToSharp={this.switchToSharp}
                onSwitchToFlat={this.switchToFlat}
                onShowImportChordSheetDialog={this.showImportChordSheetDialog}
              />

              <textarea
                className="sheet-editor active"
                ref={textarea => this.chordSheetEditor = textarea}
                onChange={this.onChordSheetChange}
                onSelect={this.onSelectionChange}
                value={this.state.chordSheet}
              ></textarea>
            </section>

            <section className="column column-right">
              <ul className="mod-radio-group">
                <li>
                  <input
                    checked={!this.state.htmlPreviewActive}
                    onChange={this.onPreviewModeChange}
                    id="view-type-plain"
                    name="view_type"
                    type="radio"
                    value="plain"
                  />
                  <label htmlFor="view-type-plain">Text</label>
                </li>

                <li>
                  <input
                    checked={this.state.htmlPreviewActive}
                    ref={checkbox => this.htmlPreviewCheckbox = checkbox}
                    onChange={this.onPreviewModeChange}
                    id="view-type-html"
                    name="view_type"
                    type="radio"
                    value="html"
                  />
                  <label htmlFor="view-type-html">HTML</label>
                </li>
              </ul>

              {this.renderTextPreviewer()}
              {this.renderHtmlPreviewer()}
            </section>
          </div>
        </main>

        {this.renderImportChordSheetModal()}
      </div>
    );
  }

  renderTextPreviewer() {
    if (this.state.htmlPreviewActive) {
      return null;
    }

    const song = new ChordSheetJS.ChordProParser().parse(this.state.chordSheet);
    const textChordSheet = new ChordSheetJS.TextFormatter().format(song);

    return <textarea
      readOnly="readonly"
      className="sheet-editor active"
      value={textChordSheet}
    ></textarea>;
  }

  renderHtmlPreviewer() {
    if (!this.state.htmlPreviewActive) {
      return null;
    }

    const song = new ChordSheetJS.ChordProParser().parse(this.state.chordSheet);
    const htmlChordSheet = new ChordSheetJS.HtmlFormatter().format(song);

    return <div
      className="sheet-viewer mod-html-preview active"
      dangerouslySetInnerHTML={{__html: htmlChordSheet}}
    ></div>;
  }

  renderImportChordSheetModal() {
    if (!this.state.importChordSheetModalVisible) {
      return null;
    }

    return <section className="mod-modal mod-import-chord-sheet" id="import-chord-sheet-modal">
      <button className="close" onClick={this.hideImportChordSheetDialog}>×</button>

      <div className="contents">
        <h1>Import chord sheet</h1>
        <textarea
          className="sheet-editor active"
          ref={importChordSheetEditor => this.importChordSheetEditor = importChordSheetEditor}
        ></textarea>

        <div className="mod-toolbar">
          <button className="large" onClick={this.importChordSheet}>Import chord sheet</button>
        </div>
      </div>
    </section>;
  }

  onChordSheetChange = () => {
    this.setState({chordSheet: this.chordSheetEditor.value});
  };

  onPreviewModeChange = () => {
    this.setState({htmlPreviewActive: this.htmlPreviewCheckbox.checked})
  };

  onSelectionChange = () => {
    this.setState({
      selectionStart: this.chordSheetEditor.selectionStart,
      selectionEnd: this.chordSheetEditor.selectionEnd
    });
  };

  getTextRanges() {
    const {chordSheet} = this.state;
    let {selectionStart, selectionEnd} = this.state;

    if (selectionStart === selectionEnd) {
      selectionStart = 0;
      selectionEnd = this.state.chordSheet.length;
    }

    const selection = chordSheet.slice(selectionStart, selectionEnd);
    const prefix = chordSheet.slice(0, selectionStart);
    const suffix = chordSheet.slice(selectionEnd);

    return {selection, prefix, suffix};
  }

  transitChords(processor) {
    const {selectionStart, selectionEnd} = this.state;
    const {selection, prefix, suffix} = this.getTextRanges();
    const song = new ChordSheetJS.ChordProParser().parse(selection);
    this.transitSong(song, processor);
    const replacement = new ChordSheetJS.ChordProFormatter().format(song);

    this.setState({
      chordSheet: prefix + replacement + suffix
    });

    if (selectionStart !== selectionEnd) {
      this.setState({
        selectionStart: prefix.length,
        selectionEnd: prefix.length + replacement.length
      }, () => { this.adjustSelection() });
    }
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

  transposeUp = () => {
    this.transitChords(chord => chord.transposeUp());
  };

  transposeDown = () => {
    this.transitChords(chord => chord.transposeDown());
  };

  switchToSharp = () => {
    this.transitChords(chord => chord.useModifier('#'));
  };

  switchToFlat = () => {
    this.transitChords(chord => chord.useModifier('b'));
  };

  showImportChordSheetDialog = () => {
    this.setState({importChordSheetModalVisible: true});
  };

  hideImportChordSheetDialog = () => {
    this.setState({importChordSheetModalVisible: false});
  };

  importChordSheet = () => {
    this.hideImportChordSheetDialog();
    const song = new ChordSheetJS.ChordSheetParser().parse(this.importChordSheetEditor.value);
    const chordSheet = new ChordSheetJS.ChordProFormatter().format(song);

    this.setState({chordSheet});
  };
}

export default App;
