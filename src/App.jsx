import React, { Component } from 'react';
import ChordSheetJS from 'chordsheetjs';
import Chord from 'chordjs';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { compress, decompress } from './string_compression';
import debounce from './debounce';
import Header from './Header';
import Toolbar from './Toolbar';
import ImportDialog from './ImportDialog';
import RadioGroup from './RadioGroup';
import ChordSheetEditor from './ChordSheetEditor';
import ChordSheetHTMLViewer from './ChordSheetHTMLViewer';
import ChordSheetTextViewer from './ChordSheetTextViewer';
import exampleChordProSheet from './example_chord_pro_sheet';
import './App.css';

class App extends Component {
  static processChord(item, processor) {
    if (item instanceof ChordSheetJS.ChordLyricsPair && item.chords) {
      const parsedChord = Chord.parse(item.chords);

      if (parsedChord) {
        const processedChordLyricsPair = new ChordSheetJS.ChordLyricsPair();
        processedChordLyricsPair.chords = processor(parsedChord).toString();
        processedChordLyricsPair.lyrics = item.lyrics;
        return processedChordLyricsPair;
      }
    }

    return item;
  }

  static transitSong(song, processor) {
    const processedSong = new ChordSheetJS.Song();
    processedSong.metaData = song.metaData;

    processedSong.lines = song.lines.map((line) => {
      const processedLine = new ChordSheetJS.Line();
      processedLine.items = line.items.map(item => App.processChord(item, processor));
      return processedLine;
    });

    return processedSong;
  }

  getQueryParam(name, defaultValue) {
    this.parsedQuery || (this.parsedQuery = queryString.parse(window.location.hash));

    if (name in this.parsedQuery) {
      return this.parsedQuery[name];
    }

    return defaultValue;
  }

  updateLocationHash = debounce(() => {
    const { htmlPreviewActive, chordSheet } = this.state;

    window.location.hash = queryString.stringify({
      preview: htmlPreviewActive ? 'html' : 'text',
      chord_sheet: compress(chordSheet),
    });
  });

  componentDidUpdate() {
    this.updateLocationHash();
  }

  constructor() {
    super();

    this.state = {
      chordSheet: decompress(this.getQueryParam('chord_sheet', '')) || exampleChordProSheet,
      htmlPreviewActive: this.getQueryParam('preview', 'html') === 'html',
      selectionStart: 0,
      selectionEnd: 0,
      showImportDialog: false,
    };
  }

  onChordSheetChange = (chordSheet) => {
    this.setState({ chordSheet });
  };

  onPreviewModeChange = (newMode) => {
    this.setState({ htmlPreviewActive: newMode === 'html' });
  };

  onSelectionChange = ({ selectionStart, selectionEnd }) => {
    this.setState({ selectionStart, selectionEnd });
  };

  getTextRanges() {
    const { chordSheet } = this.state;
    let { selectionStart, selectionEnd } = this.state;

    if (selectionStart === selectionEnd) {
      selectionStart = 0;
      selectionEnd = this.state.chordSheet.length;
    }

    const selection = chordSheet.slice(selectionStart, selectionEnd);
    const prefix = chordSheet.slice(0, selectionStart);
    const suffix = chordSheet.slice(selectionEnd);

    return { selection, prefix, suffix };
  }

  transitChords(processor) {
    const { selectionStart, selectionEnd } = this.state;
    const { selection, prefix, suffix } = this.getTextRanges();
    const song = new ChordSheetJS.ChordProParser().parse(selection);
    const processedSong = App.transitSong(song, processor);
    const replacement = new ChordSheetJS.ChordProFormatter().format(processedSong);

    this.setState({
      chordSheet: prefix + replacement + suffix,
    });

    if (selectionStart !== selectionEnd) {
      this.setState({
        selectionStart: prefix.length,
        selectionEnd: prefix.length + replacement.length,
      });
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
    this.setState({ showImportDialog: true });
  };

  hideImportChordSheetDialog = () => {
    this.setState({ showImportDialog: false });
  };

  importChordSheet = (sheet) => {
    this.hideImportChordSheetDialog();
    const song = new ChordSheetJS.ChordSheetParser({ preserveWhitespace: false }).parse(sheet);
    const chordSheet = new ChordSheetJS.ChordProFormatter().format(song);

    this.setState({ chordSheet });
  };

  renderEditorColumn() {
    const { chordSheet, selectionStart, selectionEnd } = this.state;

    return (
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
        />
      </section>
    );
  }

  renderViewerColumn() {
    const { htmlPreviewActive, chordSheet } = this.state;
    const song = new ChordSheetJS.ChordProParser().parse(chordSheet);

    return (
      <section className="App__column">
        <RadioGroup
          selected={htmlPreviewActive ? 'html' : 'text'}
          onOptionSelected={this.onPreviewModeChange}
          options={{ html: 'Markup', text: 'Plain' }}
        />

        {htmlPreviewActive ? <ChordSheetHTMLViewer song={song} /> : <ChordSheetTextViewer song={song} />}
      </section>
    );
  }

  render() {
    return (
      <div className="App">
        <Header />

        <main className="App__container">
          <div className="App__columns">
            { this.renderEditorColumn() }
            { this.renderViewerColumn() }
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
}

App.propTypes = {
  chordSheet: PropTypes.string,
  htmlPreviewActive: PropTypes.bool,
  selectionStart: PropTypes.number,
  selectionEnd: PropTypes.number,
  showImportDialog: PropTypes.bool,
};

App.defaultProps = {
  chordSheet: exampleChordProSheet,
  htmlPreviewActive: true,
  selectionStart: 0,
  selectionEnd: 0,
  showImportDialog: false,
};

export default App;
