import React from 'react';
import ChordSheetJS from 'chordsheetjs';
import './ChordSheetTextViewer.css';

export default function ChordSheetTextViewer(props) {
  const { song } = props;
  const textChordSheet = new ChordSheetJS.TextFormatter().format(song);

  return <textarea readOnly className="ChordSheetEditor" value={textChordSheet} />;
}
