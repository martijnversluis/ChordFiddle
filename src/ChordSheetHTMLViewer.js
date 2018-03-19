import React, {Component} from 'react';
import ChordSheetJS from 'chordsheetjs';
import './ChordSheetHTMLViewer.css';

export default class ChordSheetHTMLViewer extends Component {
  render() {
    const {song} = this.props;
    const htmlChordSheet = new ChordSheetJS.HtmlTableFormatter().format(song);

    return(
      <div
        className="ChordSheetHTMLViewer"
        dangerouslySetInnerHTML={{__html: htmlChordSheet}}
      ></div>
    );
  }
}
