import React, { Component } from 'react';
import ChordSheetJS from 'chordsheetjs';
import PropTypes from 'prop-types';

import Header from './Header';
import ImportDialogContainer from '../containers/ImportDialogContainer';
import PreviewModeSelectorContainer from '../containers/PreviewModeSelectorContainer';
import ChordSheetHTMLViewer from './ChordSheetHTMLViewer';
import ChordSheetTextViewer from './ChordSheetTextViewer';
import EditorColumn from './EditorColumn';

import '../css/App.css';

class App extends Component {
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
        <PreviewModeSelectorContainer />
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
            <EditorColumn />
            {this.renderViewerColumn()}
          </div>
        </main>

        <ImportDialogContainer />
      </div>
    );
  }
}

App.propTypes = {
  chordSheet: PropTypes.string.isRequired,
  previewMode: PropTypes.string.isRequired,
};

export default App;
