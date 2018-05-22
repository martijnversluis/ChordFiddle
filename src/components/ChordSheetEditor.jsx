import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/ChordSheetEditor.css';

class ChordSheetEditor extends Component {
  componentDidUpdate() {
    const { selectionStart, selectionEnd } = this.props;

    if (selectionStart !== selectionEnd) {
      this.chordSheetEditor.focus();
      this.chordSheetEditor.setSelectionRange(selectionStart, selectionEnd);
    }
  }

  onChordSheetChange = (event) => {
    const { onChordSheetChange } = this.props;
    onChordSheetChange(event.target.value);
  };

  onSelectionChange = (event) => {
    const { onSelectionChange } = this.props;
    const { selectionStart, selectionEnd } = event.target;
    onSelectionChange(selectionStart, selectionEnd);
  };

  render() {
    const { chordSheet } = this.props;

    return (
      <textarea
        className="ChordSheetTextViewer"
        onChange={this.onChordSheetChange}
        onSelect={this.onSelectionChange}
        ref={textarea => (this.chordSheetEditor = textarea)}
        value={chordSheet}
      />
    );
  }
}

ChordSheetEditor.propTypes = {
  selectionStart: PropTypes.number.isRequired,
  selectionEnd: PropTypes.number.isRequired,
  chordSheet: PropTypes.string.isRequired,
  onChordSheetChange: PropTypes.func.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
};

export default ChordSheetEditor;
