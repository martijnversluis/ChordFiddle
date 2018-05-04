import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChordSheetJS from 'chordsheetjs';
import Chord from 'chordjs';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { compress, decompress } from '../utils/string_compression';
import debounce from '../utils/debounce';
import Header from './Header';
import Toolbar from './Toolbar';
import ImportDialog from './ImportDialog';
import PreviewModeSelector from './PreviewModeSelector';
import ChordSheetEditor from './ChordSheetEditor';
import ChordSheetHTMLViewer from './ChordSheetHTMLViewer';
import ChordSheetTextViewer from './ChordSheetTextViewer';
import exampleChordProSheet from '../utils/example_chord_pro_sheet';
import store from '../store';
import { hideImportDialog } from '../actions/ui_actions';
import '../css/App.css';

class App extends Component {
  static processChord(item, processor) {
    if (item instanceof ChordSheetJS.ChordLyricsPair && item.chords) {
      const parsedChord = Chord.parse(item.chords);

      if (parsedChord) {
        const processedChordLyricsPair = item.clone();
        processedChordLyricsPair.chords = processor(parsedChord).toString();
        return processedChordLyricsPair;
      }
    }

    return item;
  }

  static transitSong(song, processor) {
    const processedSong = song.clone();

    processedSong.lines = song.lines.map((line) => {
      const processedLine = line.clone();
      processedLine.items = line.items.map(item => App.processChord(item, processor));
      return processedLine;
    });

    return processedSong;
  }

  constructor() {
    super();

    this.state = {
      chordSheet: decompress(this.getQueryParam('chord_sheet', '')) || exampleChordProSheet,
      selectionStart: 0,
      selectionEnd: 0,
    };
  }

  componentDidUpdate = debounce(() => {
    const { previewMode } = this.props;
    const { chordSheet } = this.state;

    window.location.hash = queryString.stringify({
      preview: previewMode,
      chord_sheet: compress(chordSheet),
    });
  });

  onChordSheetChange = (chordSheet) => {
    this.setState({ chordSheet });
  };

  onSelectionChange = ({ selectionStart, selectionEnd }) => {
    this.setState({ selectionStart, selectionEnd });
  };

  getQueryParam(name, defaultValue) {
    if (!this.parsedQuery) {
      this.parsedQuery = queryString.parse(window.location.hash);
    }

    if (name in this.parsedQuery) {
      return this.parsedQuery[name];
    }

    return defaultValue;
  }

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

  importChordSheet = (sheet) => {
    store.dispatch(hideImportDialog());
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
    const { chordSheet } = this.state;
    const song = new ChordSheetJS.ChordProParser().parse(chordSheet);

    return (
      <section className="App__column">
        <PreviewModeSelector />
        {this.renderViewer(song)}
      </section>
    );
  }

  renderViewer(song) {
    const { previewMode } = this.props;

    switch (previewMode) {
      case 'html':
        return <ChordSheetHTMLViewer song={song} />;
      case 'text':
        return <ChordSheetTextViewer song={song} />;
      default:
        return null;
    }
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

        <ImportDialog onSubmit={this.importChordSheet} />
      </div>
    );
  }
}

App.propTypes = {
  chordSheet: PropTypes.string,
  selectionStart: PropTypes.number,
  selectionEnd: PropTypes.number,
};

App.defaultProps = {
  chordSheet: exampleChordProSheet,
  selectionStart: 0,
  selectionEnd: 0,
  previewMode: PropTypes.string,
};

const mapStateToProps = state => {
  const { previewMode } = state.ui;
  return { previewMode };
};

export default connect(mapStateToProps)(App);
