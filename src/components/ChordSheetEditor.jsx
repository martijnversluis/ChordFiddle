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

  onSelectionChange = (event) => {
    const { selectionStart: start, selectionEnd: end } = event.target;
    const { setSelectionRange } = this.props;
    setSelectionRange({ start, end });
  };

  render() {
    const { chordSheet, setChordSheet } = this.props;

    return (
      <textarea
        className="ChordSheetTextViewer"
        onChange={event => setChordSheet(event.target.value)}
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
};

const mapStateToProps = (state) => {
  const { chordSheet, selectionStart, selectionEnd } = state.chordSheet;
  return { chordSheet, selectionStart, selectionEnd };
};

const mapDispatchToProps = {
  setChordSheet, setSelectionRange
};

export default connect(mapStateToProps, mapDispatchToProps)(ChordSheetEditor);
