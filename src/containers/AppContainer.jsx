import { connect } from 'react-redux';

import App from '../components/App';

const mapStateToProps = (state) => {
  const { previewMode } = state.ui;
  const { chordSheet } = state.chordSheet;
  return { chordSheet, previewMode };
};

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
