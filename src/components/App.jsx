import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import ImportDialogContainer from '../containers/ImportDialogContainer';
import EditorColumn from './EditorColumn';

import '../css/App.css';
import ViewerColumn from './ViewerColumn';

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

  render() {
    return (
      <div className="App">
        <Header />

        <main className="App__container">
          <div className="App__columns">
            <EditorColumn />
            <ViewerColumn />
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
