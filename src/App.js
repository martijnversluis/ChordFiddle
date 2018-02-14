import React, { Component } from 'react';
import ChordSheetJS from 'chordsheetjs';
import Chord from 'chordjs';
import Header from './Header';
import Toolbar from './Toolbar';
import ImportDialog from './ImportDialog';
import RadioGroup from "./RadioGroup";
import exampleChordProSheet from './example_chord_pro_sheet';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      chordSheet: exampleChordProSheet,
      textPreview: '',
      htmlPreview: '',
      htmlPreviewActive: false,
      selectionStart: 0,
      selectionEnd: 0,
      showImportDialog: false
    };
  }

  adjustSelection() {
    const {selectionStart, selectionEnd} = this.state;
    this.chordSheetEditor.focus();
    this.chordSheetEditor.setSelectionRange(selectionStart, selectionEnd);
  }

  render() {
    const {htmlPreviewActive} = this.state;

    return (
      <div className="App">
        <Header/>

        <main className="App__container">
          <div className="App__columns">
            <section className="App__column">
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

            <section className="App__column">
              <RadioGroup
                selected={htmlPreviewActive ? "html" : "text"}
                onOptionSelected={this.onPreviewModeChange}
                options={{text: "Text", html: "HTML"}}
              />

              {this.renderTextPreviewer()}
              {this.renderHtmlPreviewer()}
            </section>
          </div>
        </main>

        <ImportDialog
          onSubmit={this.importChordSheet}
          onCancel={this.hideImportChordSheetDialog}
          show={this.state.showImportDialog}
        />
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

  onChordSheetChange = () => {
    this.setState({chordSheet: this.chordSheetEditor.value});
  };

  onPreviewModeChange = (newMode) => {
    this.setState({htmlPreviewActive: newMode === "html"})
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
    this.setState({showImportDialog: true});
  };

  hideImportChordSheetDialog = () => {
    this.setState({showImportDialog: false});
  };

  importChordSheet = (sheet) => {
    this.hideImportChordSheetDialog();
    const song = new ChordSheetJS.ChordSheetParser().parse(sheet);
    const chordSheet = new ChordSheetJS.ChordProFormatter().format(song);

    this.setState({chordSheet});
  };
}

export default App;
