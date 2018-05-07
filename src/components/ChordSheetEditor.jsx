import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import store from '../store/index';
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

  onChange = () => {
    store.dispatch(setChordSheet(this.chordSheetEditor.value));
  };

  onSelectionChange = () => {
    const { selectionStart: start, selectionEnd: end } = this.chordSheetEditor;
    store.dispatch(setSelectionRange({ start, end }));
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
  chordSheet: PropTypes.string,
};

const mapStateToProps = state => {
  const { chordSheet, selectionStart, selectionEnd } = state.chordSheet;
  return { chordSheet, selectionStart, selectionEnd };
};

export default connect(mapStateToProps)(ChordSheetEditor);
