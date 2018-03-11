import React, {Component} from 'react';
import './ChordSheetEditor.css';

export default class ChordSheetEditor extends Component {
  render() {
    const {chordSheet, onChange} = this.props;

    return(
      <textarea
        readOnly="readonly"
        className="ChordSheetTextViewer"
        onChange={onChange}
        onSelect={this.onSelectionChange}
        ref={textarea => (this.chordSheetEditor = textarea)}
        value={chordSheet}
      ></textarea>
    );
  }

  componentDidUpdate() {
    const {selectionStart, selectionEnd} = this.props;
    this.chordSheetEditor.focus();
    this.chordSheetEditor.setSelectionRange(selectionStart, selectionEnd);
  }

  onSelectionChange = () => {
    const {onSelect} = this.props;

    onSelect({
      selectionStart: this.chordSheetEditor.selectionStart,
      selectionEnd: this.chordSheetEditor.selectionEnd
    });
  };
}
