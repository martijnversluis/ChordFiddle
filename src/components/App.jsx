import React, { Component } from 'react';
import ChordSheetJS from 'chordsheetjs';
import PropTypes from 'prop-types';

import Header from './Header';
import Toolbar from './Toolbar';
import ImportDialogContainer from '../containers/ImportDialogContainer';
import PreviewModeSelectorContainer from '../containers/PreviewModeSelectorContainer';
import ChordSheetEditorContainer from '../containers/ChordSheetEditorContainer';
import ChordSheetHTMLViewer from './ChordSheetHTMLViewer';
import ChordSheetTextViewer from './ChordSheetTextViewer';

import '../css/App.css';
import { switchToFlat, switchToSharp, transposeDown, transposeUp } from '../state/chord_sheet/actions';
import { showImportDialog } from '../state/ui/actions';

class App extends Component {
  static renderEditorColumn() {
    return (
      <section className="App__column">
        <Toolbar buttons={
          [
            ['Transpose down', transposeDown],
            ['Transpose up', transposeUp],
            ['Use ♯', switchToSharp],
            ['Use ♭', switchToFlat],
            ['Import chord sheet', showImportDialog],
          ]
        }/>
        <ChordSheetEditorContainer />
      </section>
    );
  }

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
            {App.renderEditorColumn()}
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
