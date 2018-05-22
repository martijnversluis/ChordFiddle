import { connect } from 'react-redux';
import ChordSheetViewer from '../components/ChordSheetViewer';

const mapStateToProps = (state) => {
  const {
    chordSheet: { chordSheet },
    ui: { previewMode },
  } = state;

  return { chordSheet, previewMode };
};

const ChordSheetViewerContainer = connect(mapStateToProps)(ChordSheetViewer);

export default ChordSheetViewerContainer;
