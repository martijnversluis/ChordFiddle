import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setChordSheet, setSelectionRange } from '../actions/chord_sheet_actions';
import '../css/ChordSheetEditor.css';

class ChordSheetEditor extends Component {
  componentDidUpdate() {
    const { selectionStart, selectionEnd } = this.props;

    if (selectionStart !== selectionEnd) {
      this.chordSheetEditor.focus();
      this.chordSheetEditor.setSelectionRange(selectionStart, selectionEnd);
    }
  }

  render() {
    const { chordSheet, onChordSheetChange, onSelectionChange } = this.props;

    return (
      <textarea
        className="ChordSheetTextViewer"
        onChange={onChordSheetChange}
        onSelect={onSelectionChange}
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

const mapStateToProps = (state) => {
  const { chordSheet, selectionStart, selectionEnd } = state.chordSheet;
  return { chordSheet, selectionStart, selectionEnd };
};

const mapDispatchToProps = dispatch => ({
  onChordSheetChange(event) {
    dispatch(setChordSheet(event.target.value));
  },

  onSelectionChange(event) {
    const { selectionStart, selectionEnd } = event.target;
    dispatch(setSelectionRange(selectionStart, selectionEnd));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChordSheetEditor);
