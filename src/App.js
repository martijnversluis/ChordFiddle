import React, { Component } from 'react';
import ChordSheetJS from 'chordsheetjs';
import Chord from 'chordjs';
import Header from './Header';
import Toolbar from './Toolbar';
import ImportDialog from './ImportDialog';
import RadioGroup from './RadioGroup';
import ChordSheetEditor from './ChordSheetEditor';
import ChordSheetHTMLViewer from './ChordSheetHTMLViewer';
import ChordSheetTextViewer from './ChordSheetTextViewer';
import exampleChordProSheet from './example_chord_pro_sheet';
import './App.css';

export default class App extends Component {
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

  render() {
    const {htmlPreviewActive, chordSheet, selectionStart, selectionEnd} = this.state;
    const song = new ChordSheetJS.ChordProParser().parse(chordSheet);

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

              <ChordSheetEditor
                chordSheet={chordSheet}
                selectionStart={selectionStart}
                selectionEnd={selectionEnd}
                onChange={this.onChordSheetChange}
                onSelect={this.onSelectionChange}
                textareaRef={textarea => this.chordSheetEditor = textarea}
              />
            </section>

            <section className="App__column">
              <RadioGroup
                selected={htmlPreviewActive ? "html" : "text"}
                onOptionSelected={this.onPreviewModeChange}
                options={{text: "Plain", html: "Markup"}}
              />

              {htmlPreviewActive ? <ChordSheetHTMLViewer song={song}/> : <ChordSheetTextViewer song={song}/>}
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

  adjustSelection() {
    const {selectionStart, selectionEnd} = this.state;
    this.chordSheetEditor.focus();
    this.chordSheetEditor.setSelectionRange(selectionStart, selectionEnd);
  }

  onChordSheetChange = () => {
    this.setState({chordSheet: this.chordSheetEditor.value});
  };

  onPreviewModeChange = (newMode) => {
    this.setState({htmlPreviewActive: newMode === "html"})
  };

  onSelectionChange = ({selectionStart, selectionEnd}) => {
    this.setState({selectionStart, selectionEnd});
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
