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

import '../css/App.css';

class App extends Component {
  static renderEditorColumn() {
    return (
      <section className="App__column">
        <Toolbar />
        <ChordSheetEditor />
      </section>
    );
  }

  componentDidUpdate() {
    this.updateLocationHash();
  }

  updateLocationHash = debounce(() => {
    const { chordSheet, previewMode } = this.props;

    window.location.hash = queryString.stringify({
      preview: previewMode,
      chord_sheet: compress(chordSheet),
    });
  });

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
            {App.renderEditorColumn()}
            {this.renderViewerColumn()}
          </div>
        </main>

        <ImportDialog />
      </div>
    );
  }
}

App.propTypes = {
  chordSheet: PropTypes.string.isRequired,
  previewMode: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { previewMode } = state.ui;
  const { chordSheet } = state.chordSheet;
  return { chordSheet, previewMode };
};

export default connect(mapStateToProps)(App);
