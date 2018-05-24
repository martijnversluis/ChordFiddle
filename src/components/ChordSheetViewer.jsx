import React from 'react';
import ChordSheetJS from 'chordsheetjs';
import PropTypes from 'prop-types';

import ChordSheetHTMLViewer from './ChordSheetHTMLViewer';
import ChordSheetTextViewer from './ChordSheetTextViewer';

const ChordSheetViewer = (props) => {
  const { chordSheet, previewMode } = props;
  const song = new ChordSheetJS.ChordProParser().parse(chordSheet);

  switch (previewMode) {
    case 'html':
      return <ChordSheetHTMLViewer song={song} />;
    case 'text':
      return <ChordSheetTextViewer song={song} />;
    default:
      return null;
  }
};

ChordSheetViewer.propTypes = {
  chordSheet: PropTypes.string.isRequired,
  previewMode: PropTypes.string.isRequired,
};

export default ChordSheetViewer;
