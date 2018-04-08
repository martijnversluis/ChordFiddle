import React from 'react';
import ChordSheetJS from 'chordsheetjs';
import './ChordSheetHTMLViewer.css';

export default function ChordSheetHTMLViewer(props) {
  const { song } = props;
  const htmlChordSheet = new ChordSheetJS.HtmlTableFormatter().format(song);

    return (
      <div className="ChordSheetHTMLViewer" dangerouslySetInnerHTML={{ __html: htmlChordSheet }} />
    );
  }
}
