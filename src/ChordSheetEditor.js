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
        ref={this.ref}
        value={chordSheet}
      ></textarea>
    );
  }

  ref = (textarea) => {
    const {textareaRef} = this.props;
    this.chordSheetEditor = textarea;
    textareaRef(textarea);
  };

  onSelectionChange = () => {
    const {onSelect} = this.props;

    onSelect({
      selectionStart: this.chordSheetEditor.selectionStart,
      selectionEnd: this.chordSheetEditor.selectionEnd
    });
  };
}
