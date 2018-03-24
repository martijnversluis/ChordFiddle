import React, {Component} from 'react';
import './ChordSheetEditor.css';

export default class ChordSheetEditor extends Component {
  render() {
    const {chordSheet} = this.props;

    return(
      <textarea
        className="ChordSheetTextViewer"
        onChange={this.onChange}
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

  onChange = () => {
    const {onChange} = this.props;
    onChange(this.chordSheetEditor.value);
  };

  onSelectionChange = () => {
    const {onSelect} = this.props;

    onSelect({
      selectionStart: this.chordSheetEditor.selectionStart,
      selectionEnd: this.chordSheetEditor.selectionEnd
    });
  };
}
