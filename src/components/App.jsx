import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import ImportDialogContainer from '../containers/ImportDialogContainer';
import EditorColumn from './EditorColumn';

import '../css/App.css';
import ViewerColumn from './ViewerColumn';

const App = () => (
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

App.propTypes = {
  chordSheet: PropTypes.string.isRequired,
  previewMode: PropTypes.string.isRequired,
};

export default App;
