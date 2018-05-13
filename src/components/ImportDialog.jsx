import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { hideImportDialog } from '../actions/ui_actions';
import { importChordSheet } from '../actions/chord_sheet_actions';

import '../css/ImportDialog.css';

class ImportDialog extends Component {
  render() {
    const { onCloseButtonClick, onImportButtonClick, show } = this.props;

    if (!show) {
      return null;
    }

    return (
      <section className="ImportDialog">
        <button className="ImportDialog__close-button" onClick={onCloseButtonClick}>×</button>

        <div className="ImportDialog__contents">
          <h1>Import chord sheet</h1>
          <textarea
            className="ChordSheetEditor"
            ref={importChordSheetEditor => (this.importChordSheetEditor = importChordSheetEditor)}
          />

          <div className="ImportDialog__buttons">
            <button className="large" onClick={onImportButtonClick}>Import chord sheet</button>
          </div>
        </div>
      </section>
    );
  }
}

ImportDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
  onImportButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { showImportDialog: show } = state.ui;
  return { show };
};

const mapDispatchToProps = dispatch => ({
  onCloseButtonClick() {
    dispatch(hideImportDialog());
  },

  onImportButtonClick() {
    dispatch(importChordSheet(this.importChordSheetEditor.value));
    dispatch(hideImportDialog());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportDialog);
