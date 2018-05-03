import React from 'react';
import ChordSheetJS from 'chordsheetjs';
import PropTypes from 'prop-types';

import '../css/ChordSheetTextViewer.css';

function ChordSheetTextViewer(props) {
  const { song } = props;
  const textChordSheet = new ChordSheetJS.TextFormatter().format(song);

  return <textarea readOnly className="ChordSheetEditor" value={textChordSheet} />;
}

ChordSheetTextViewer.propTypes = {
  song: PropTypes.instanceOf(ChordSheetJS.Song).isRequired,
};

export default ChordSheetTextViewer;
