import React from 'react';
import ChordSheetJS from 'chordsheetjs';
import PropTypes from 'prop-types';

import '../css/ChordSheetHTMLViewer.css';

const ChordSheetHTMLViewer = (props) => {
  const { song } = props;
  const htmlChordSheet = new ChordSheetJS.HtmlTableFormatter().format(song);

  return (
    <div className="ChordSheetHTMLViewer" dangerouslySetInnerHTML={{ __html: htmlChordSheet }} />
  );
};

ChordSheetHTMLViewer.propTypes = {
  song: PropTypes.instanceOf(ChordSheetJS.Song).isRequired,
};

export default ChordSheetHTMLViewer;
