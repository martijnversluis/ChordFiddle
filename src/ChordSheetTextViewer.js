import React, {Component} from 'react';
import './ChordSheetTextViewer.css';
import ChordSheetJS from 'chordsheetjs';

export default class ChordSheetTextViewer extends Component {
  render() {
    const {song} = this.props;
    const textChordSheet = new ChordSheetJS.TextFormatter().format(song);

    return <textarea readOnly={true} className="ChordSheetEditor" value={textChordSheet}></textarea>;
  }
}
