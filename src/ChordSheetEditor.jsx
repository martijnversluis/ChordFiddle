import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ChordSheetEditor.css';

class ChordSheetEditor extends Component {
  componentDidUpdate() {
    const { selectionStart, selectionEnd } = this.props;

    if (selectionStart !== null && selectionEnd !== null) {
      this.chordSheetEditor.focus();
      this.chordSheetEditor.setSelectionRange(selectionStart, selectionEnd);
    }
  }

  onChange = () => {
    const { onChange } = this.props;
    onChange(this.chordSheetEditor.value);
  };

  onSelectionChange = () => {
    const { onSelect } = this.props;
    let selectionStart = this.chordSheetEditor.selectionStart;
    let selectionEnd = this.chordSheetEditor.selectionEnd;

    if (selectionStart === selectionEnd) {
      selectionStart = null;
      selectionEnd = null;
    }

    onSelect({ selectionStart, selectionEnd });
  };

  render() {
    const { chordSheet } = this.props;

    return (
      <textarea
        className="ChordSheetTextViewer"
        onChange={this.onChange}
        onSelect={this.onSelectionChange}
        ref={textarea => (this.chordSheetEditor = textarea)}
        value={chordSheet}
      />
    );
  }
}

ChordSheetEditor.propTypes = {
  selectionStart: PropTypes.number,
  selectionEnd: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  chordSheet: PropTypes.string.isRequired,
};

ChordSheetEditor.defaultProps = {
  selectionStart: null,
  selectionEnd: null,
};

export default ChordSheetEditor;
