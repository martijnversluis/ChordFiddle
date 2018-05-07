import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChordSheetJS from 'chordsheetjs';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { compress } from '../utils/string_compression';
import debounce from '../utils/debounce';
import Header from './Header';
import Toolbar from './Toolbar';
import ImportDialog from './ImportDialog';
import PreviewModeSelector from './PreviewModeSelector';
import ChordSheetEditor from './ChordSheetEditor';
import ChordSheetHTMLViewer from './ChordSheetHTMLViewer';
import ChordSheetTextViewer from './ChordSheetTextViewer';
import store from '../store';
import { hideImportDialog } from '../actions/ui_actions';
import '../css/App.css';
import { setChordSheet } from '../actions/chord_sheet_actions';

class App extends Component {
  componentDidUpdate = debounce(() => {
    const { chordSheet, previewMode } = this.props;

    window.location.hash = queryString.stringify({
      preview: previewMode,
      chord_sheet: compress(chordSheet),
    });
  });

  importChordSheet = (sheet) => {
    store.dispatch(hideImportDialog());
    const song = new ChordSheetJS.ChordSheetParser({ preserveWhitespace: false }).parse(sheet);
    const chordSheet = new ChordSheetJS.ChordProFormatter().format(song);
    store.dispatch(setChordSheet(chordSheet));
  };

  renderEditorColumn() {
    const { chordSheet, selectionStart, selectionEnd } = this.props;

    return (
      <section className="App__column">
        <Toolbar />

        <ChordSheetEditor
          chordSheet={chordSheet}
          selectionStart={selectionStart}
          selectionEnd={selectionEnd}
          onChange={this.onChordSheetChange}
        />
      </section>
    );
  }

  renderViewerColumn() {
    const { chordSheet } = this.props;
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
  previewMode: PropTypes.string,
};

const mapStateToProps = state => {
  const { previewMode } = state.ui;
  const { chordSheet, selectionStart, selectionEnd } = state.chordSheet;
  return { chordSheet, previewMode, selectionStart, selectionEnd };
};

export default connect(mapStateToProps)(App);
